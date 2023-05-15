import { useMutation } from '@tanstack/react-query';
import { useApi } from '../../context/ApiProvider';

export const useAddQuiz = () => {
  const { api } = useApi();

  return useMutation({
    mutationFn: async ({ quiz }) => {
      const newQuiz = await api.post(`/quizzes`, quiz);
      return newQuiz;
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
