import Nav from '../../components/UserPanel/Nav';
import { useQuizzes } from '../../hooks/useQuizzes';
import Loading from '../Loading';

export default function Yours() {
  const { isLoading, isError, data: games, error } = useQuizzes();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <Nav />
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
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
              <tr
                key={game.id}
                className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {game.title}
                </th>
                <th className="px-6 py-4">{game.description}</th>
                <th className="px-6 py-4">{game.totalTimesPlayed}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
