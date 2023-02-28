import Nav from '../../components/UserPanel/Nav';
import useGames from '../../hooks/useGames';

export default function Yours() {
  const games = useGames();

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
