import UPanelNav from './UPanelNav';
import { useState } from 'react';

export default function Yours() {
  const [games, setGames] = useState([
    {
      id: 1,
      title: 'Epic game',
      description: 'desc here',
      totalTimesPlayed: 10,
    },
    {
      id: 2,
      title: 'test',
      description: 'test',
      totalTimesPlayed: 5,
    },
  ]);

  return (
    <div>
      <UPanelNav />
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead>
          <tr>
            <th className="px-6 py-3">title</th>
            <th className="px-6 py-3">description</th>
            <th className="px-6 py-3">total times played</th>
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
