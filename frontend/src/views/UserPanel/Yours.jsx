import { useQuizzes } from '../../hooks/quiz/useQuizzes';
import Loading from '../Loading';

export default function Yours() {
  const { isLoading, isError, data, error } = useQuizzes();
  const games = data?.data || [];

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <div className="flex w-full justify-center">
        <table className="yours-games">
          <thead>
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Total times played</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => {
              return (
                <tr key={game.id} className="yours-games-tbody">
                  <th className="yours-games-row">{game.title}</th>
                  <th className="px-6 py-4">{game.description}</th>
                  <th className="px-6 py-4">{game.totalTimesPlayed}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
