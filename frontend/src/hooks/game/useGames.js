import { useQuery } from '@tanstack/react-query';
import { useApi } from '../../context/ApiProvider';

export const useGames = (props) => {
  const { api } = useApi();
  const { userName, ...config } = { ...props };

  return useQuery({
    queryKey: ['games', userName],
    queryFn: async () => {
      const games = await api.get(`/games${userName ? '?userName=' + userName : ''}`);
      return games;
    },
    ...config,
  });
};
