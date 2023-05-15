import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../context/ApiProvider';
import { useCookies } from 'react-cookie';

export const useRegister = () => {
  const { api } = useApi();
  const [cookies, setCookie, removeCookie] = useCookies();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userName, password, email }) => {
      const user = await api.post('/auth/register', { userName, password, email });
      return user;
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.log(`rolling back optimistic update with id ${context.id}`);
    },
    onSuccess: (token, variables, context) => {},
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });
};
