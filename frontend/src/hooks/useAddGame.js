import { useMutation } from '@tanstack/react-query';
import { useApi } from '../context/ApiProvider';

export const useAddGame = () => {
  const { api } = useApi();

  return useMutation({
    mutationFn: async ({ game }) => {
      console.log(game);
      const newGame = await api.post(`/games`, game);
      return newGame;
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.log(`rolling back optimistic update with id ${context.id}`);
    },
    onSuccess: (data, variables, context) => {
      return data;
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });
};
