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
      <div className="flex h-screen w-full items-center justify-center">
        <table className="overflow-hidden rounded-lg border border-violet-600 shadow-lg shadow-violet-600">
          <thead className="border-b bg-amber-50 font-semibold">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Total times played</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => {
              return (
                <tr key={game.id} className="yours-games-tbody border-b">
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
