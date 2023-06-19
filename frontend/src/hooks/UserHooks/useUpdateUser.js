import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../context/ApiProvider';

export const useUpdateUser = () => {
  const { api } = useApi();
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, valueToUpdate, user }) => {
      const updatedUser = await api.patch(`users/${id}/${valueToUpdate}`, user);
      return updatedUser;
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.log(`rolling back optimistic update with id ${context.id}`);
      return error;
    },
    onSuccess: (data, variables, context) => {
      if (variables.valueToUpdate === 'userName') {
        setCookie('user', variables.user.userName, { path: '/' });
      }
      queryClient.invalidateQueries(['user']);
      queryClient.invalidateQueries(['token']);

      removeCookie('token');
      navigate('/login');
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });
};
