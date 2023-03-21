import { useQuery } from '@tanstack/react-query';
import { useApi } from '../context/ApiProvider';

export const useQuiz = (id, config) => {
  const { api } = useApi();

  return useQuery({
    queryKey: ['quiz', id],
    queryFn: async () => {
      const quiz = await api.get(`/quizzes/${id}`);
      return quiz;
    },
    ...config,
  });
};
