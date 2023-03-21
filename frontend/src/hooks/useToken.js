import { useQuery } from '@tanstack/react-query';
import { useApi } from '../context/ApiProvider';
import { useCookies } from 'react-cookie';

export const useToken = (config) => {
  const { api } = useApi();
  const [cookies, setCookie, removeCookie] = useCookies();

  return useQuery({
    queryKey: ['token'],
    queryFn: async () => {
      const authenticated = await api.get('/token');

      if (authenticated?.data) {
        return cookies.token;
      }

      return null;
    },
    retry: false,
    ...config,
  });
};
