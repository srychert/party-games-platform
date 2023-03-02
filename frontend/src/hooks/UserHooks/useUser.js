import { useQuery } from '@tanstack/react-query';
import { useApi } from '../../context/ApiProvider';

function useUser(username, config) {
  const { api } = useApi();

  return useQuery({
    queryKey: ['user', username],
    queryFn: async () => {
      const data = await api.get(`users/user-name/${username}`);
      return data;
    },
    ...config,
  });
}

export default useUser;
