import { useNavigate } from 'react-router-dom';

import { useQuizzes } from '../../hooks/quiz/useQuizzes';
import Loading from '../Loading';
import { useState } from 'react';
import GameCard from '../../components/GameCard/GameCard';
import { useGames } from '../../hooks/game/useGames';
import { IconContext } from 'react-icons';
import { CgSearch, CgSelect } from 'react-icons/cg';
import { useMemo } from 'react';

function List() {
  let navigate = useNavigate();
  const quizzesQuery = useQuizzes();
  const gamesQuery = useGames();
  const quizzes = (quizzesQuery?.data?.data || []).map((q) => {
    return { ...q, type: 'quiz' };
  });
  const games = (gamesQuery?.data?.data || []).map((g) => {
    return { ...g, type: 'game' };
  });

  const allGames = [...games, ...quizzes];

  const handleChooseGame = (gameType, gameID) => {
    navigate(`/host/${gameType}/${gameID}`);
  };

  const [query, setQuery] = useState('');
  const [sortType, setSortType] = useState('ttp-desc');

  const handleSearchFilter = () => {
    return allGames.filter(
      (game) =>
        game.title.toLowerCase().includes(query.toLowerCase()) ||
        game.description.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleSort = (games) => {
    switch (sortType) {
      case 'ttp-desc':
        games.sort((a, b) => (b.totalTimesPlayed > a.totalTimesPlayed ? 1 : -1));
        break;
      case 'ttp-asc':
        games.sort((a, b) => (b.totalTimesPlayed > a.totalTimesPlayed ? -1 : 1));
        break;
      case 'title-desc':
        games
          .sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
          .reverse();
        break;
      case 'title-asc':
        games.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
      default:
        break;
    }
    console.log(games);
    return games;
  };

  const filterAndSort = () => {
    const filtered = handleSearchFilter();
    const sorted = handleSort(filtered);
    return sorted;
  };

  const visibleGames = useMemo(() => filterAndSort(), [allGames, query, sortType]);

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
    <div className="flex h-full w-full flex-col overflow-y-scroll">
      <IconContext.Provider
        value={{
          size: '1.25em',
          style: {
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            zIndex: 2,
            color: 'black',
          },
        }}
      >
        {/* Filter */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-4 border-b-2 p-6 sm:justify-between">
          <div className="relative">
            <input
              className="form-input w-[200px]"
              type="text"
              name="query"
              id="query"
              autoComplete="off"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type to search"
            />

            <CgSearch />
          </div>
          <div className="relative">
            <select
              className="form-input w-[200px] pr-8"
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="ttp-desc">Times Played - DESC</option>
              <option value="ttp-asc">Times Played - ASC</option>
              <option value="title-asc">Title - ASC</option>
              <option value="title-desc">Title - DESC</option>
            </select>
            <CgSelect />
          </div>
        </div>
        {/* Games */}
        <div className="flex flex-wrap justify-center gap-6 px-6">
          {visibleGames.map((game) => (
            <GameCard key={game.id} game={game} handleChooseGame={handleChooseGame} />
          ))}
        </div>
      </IconContext.Provider>
    </div>
  );
}

export default List;
