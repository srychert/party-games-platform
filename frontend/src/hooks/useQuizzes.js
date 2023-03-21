import { useQuery } from '@tanstack/react-query';
import { useApi } from '../context/ApiProvider';

export const useQuizzes = (config) => {
  const { api } = useApi();

  return useQuery({
    queryKey: ['quizzes'],
    queryFn: async () => {
      const quizzes = await api.get(`/quizzes`);
      return quizzes.data;
    },
    ...config,
  });
};
