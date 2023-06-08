import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../context/ApiProvider';
import { useCookies } from 'react-cookie';

export const useLogin = () => {
  const { api } = useApi();
  const [cookies, setCookie, removeCookie] = useCookies();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ username, password }) => {
      const token = await api.post(
        '/auth/login',
        {},
        {
          auth: {
            username,
            password,
          },
        }
      );
      setCookie('user', username, { path: '/' });
      return token;
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.log(`rolling back optimistic update with id ${context.id}`);
    },
    onSuccess: (token, variables, context) => {
      setCookie('token', token.data, { path: '/' });
      queryClient.invalidateQueries(['user']);
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });
};
