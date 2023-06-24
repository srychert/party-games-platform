import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { useApi } from '../../context/ApiProvider';

function useUser(username, config) {
  const { api } = useApi();
  const [cookies, setCookie, removeCookie] = useCookies();

  let key = username ?? cookies.user;

  return useQuery({
    queryKey: ['user', key],
    queryFn: async () => {
      const user = await api.get(`users/user-name/${key}`);
      return user.data;
    },
    ...config,
  });
}

export default useUser;
