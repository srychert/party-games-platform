import { useQuery } from '@tanstack/react-query';
import { useApi } from '../../context/ApiProvider';

export const useEnemies = (config) => {
  const { api } = useApi();

  return useQuery({
    queryKey: ['enemies'],
    queryFn: async () => {
      const enemies = await api.get(`/games/enemies`);
      return enemies.data;
    },
    ...config,
  });
};
