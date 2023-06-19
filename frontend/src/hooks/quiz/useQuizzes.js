import { useQuery } from '@tanstack/react-query';
import { useApi } from '../../context/ApiProvider';

export const useQuizzes = (props) => {
  const { api } = useApi();
  const { userName, ...config } = { ...props };

  return useQuery({
    queryKey: ['quizzes', userName],
    queryFn: async () => {
      const quizzes = await api.get(`/quizzes${userName ? '?userName=' + userName : ''}`);
      return quizzes;
    },
    ...config,
  });
};
