import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../context/ApiProvider';
import { useCookies } from 'react-cookie';

export const useLogout = () => {
  const { api } = useApi();
  const [cookies, setCookie, removeCookie] = useCookies();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.post('/auth/logout');
      return response;
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.log(`rolling back optimistic update with id ${context.id}`);
    },
    onSuccess: (token, variables, context) => {
      removeCookie('token');
      removeCookie('user');
      queryClient.invalidateQueries(['token']);
      queryClient.invalidateQueries(['user']);
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });
};
