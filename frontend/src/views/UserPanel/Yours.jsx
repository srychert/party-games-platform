import { useCookies } from 'react-cookie';
import { useGames } from '../../hooks/game/useGames';
import { useQuizzes } from '../../hooks/quiz/useQuizzes';
import Loading from '../Loading';
import { useMemo } from 'react';

export default function Yours() {
  const [cookies, setCookie, removeCookie] = useCookies();

  const quizzesQuery = useQuizzes({ userName: cookies.user });
  const gamesQuery = useGames({ userName: cookies.user });
  const quizzes = (quizzesQuery?.data?.data || []).map((q) => {
    return { ...q, type: 'quiz' };
  });
  const games = (gamesQuery?.data?.data || []).map((g) => {
    return { ...g, type: 'game' };
  });

  const allGames = useMemo(() => {
    return [...games, ...quizzes].sort((a, b) =>
      b.totalTimesPlayed > a.totalTimesPlayed ? 1 : -1
    );
  }, [games, quizzes]);

  if (quizzesQuery.isLoading || gamesQuery.isLoading) {
    return <Loading />;
  }

  if (quizzesQuery.isError || gamesQuery.isError) {
    return (
      <div>
        <span>Error: {quizzesQuery?.error?.message}</span>
        <span>Error: {gamesQuery?.error?.message}</span>
      </div>
    );
  }

  return (
    <table className="block h-full w-full max-w-[1024px] overflow-y-auto lg:ml-auto lg:mr-auto lg:border">
      <thead className="block w-full border-b bg-amber-50 font-semibold">
        <tr className="grid grid-cols-[minmax(0,1fr)_minmax(0,_2fr)_minmax(0,1fr)] text-xl">
          <th className="grid place-content-center p-2 sm:px-6 sm:py-4">Title</th>
          <th className="grid place-content-center p-2 sm:px-6 sm:py-4">Description</th>
          <th className="grid place-content-center p-2 sm:px-6 sm:py-4">
            Total times played
          </th>
        </tr>
      </thead>
      <tbody className="block overflow-y-auto break-all text-sm sm:break-normal sm:text-base">
        {allGames.map((game) => {
          return (
            <tr
              key={game.id}
              className="grid grid-cols-[minmax(0,1fr)_minmax(0,_2fr)_minmax(0,1fr)] border-b border-white bg-gray-700 odd:text-white even:bg-stone-200"
            >
              <th className="grid place-content-center p-2 sm:px-6 sm:py-4">
                {game.title} ({game.type === 'game' ? 'G' : 'Q'})
              </th>
              <th className="border-x border-white p-2 sm:px-6 sm:py-4">
                {game.description}
              </th>
              <th className="grid place-content-center p-2 sm:px-6 sm:py-4">
                {game.totalTimesPlayed}
              </th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
