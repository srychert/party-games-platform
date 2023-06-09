import { useQuery } from '@tanstack/react-query';
import { useApi } from '../context/ApiProvider';
import { redirect } from 'react-router-dom';

export const useToken = (config) => {
  const { api } = useApi();

  return useQuery({
    queryKey: ['token'],
    queryFn: async () => {
      const authenticated = await api.get('/auth/token');

      if (authenticated.data !== true) {
        return redirect('/login');
      }

      return authenticated;
    },
    retry: false,
    ...config,
  });
};
