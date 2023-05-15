import { useQuery } from '@tanstack/react-query';
import { useApi } from '../../context/ApiProvider';

export const useGames = (config) => {
  const { api } = useApi();

  return useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      const games = await api.get(`/games`);
      return games;
    },
    ...config,
  });
};
