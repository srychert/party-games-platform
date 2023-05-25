import { useQuery } from '@tanstack/react-query';
import { useApi } from '../../context/ApiProvider';

export const useItems = (config) => {
  const { api } = useApi();

  return useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      const items = await api.get(`/games/items`);
      return items.data;
    },
    ...config,
  });
};
