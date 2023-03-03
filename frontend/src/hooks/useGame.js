import { useQuery } from '@tanstack/react-query';
import { useApi } from '../context/ApiProvider';

export const useGame = (id, config) => {
  const { api } = useApi();

  return useQuery({
    queryKey: ['game', id],
    queryFn: async () => {
      const game = await api.get(`/game/${id}`);
      return game;
    },
    ...config,
  });
};
