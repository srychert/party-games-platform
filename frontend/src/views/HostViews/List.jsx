import { useNavigate } from 'react-router-dom';

import { useQuizzes } from '../../hooks/quiz/useQuizzes';
import Loading from '../Loading';
import { useState } from 'react';
import GameCard from '../../components/GameCard/GameCard';
import { useGames } from '../../hooks/game/useGames';

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

  const handleChooseGame = (gameType, gameID) => {
    navigate(`/host/${gameType}/${gameID}`);
  };

  const [searchPhrase, setSearchPhrase] = useState('');

  const handleSearchFilter = () => {
    return [...games, ...quizzes].filter(
      (game) =>
        game.title.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        game.description.toLowerCase().includes(searchPhrase.toLowerCase())
    );
  };

  const silderFilter = () => {
    const filteredGames = games.filter((game) => {
      return game.totalTimesPlayed > 10;
    });
    return filteredGames;
  };

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
      {/* Filter */}
      <div className="m-2 flex items-center justify-center">
        <form className="flex flex-col">
          <label htmlFor="gameName">Name</label>
          <input
            className="form-input"
            type="text"
            name="gameName"
            id="gameName"
            autoComplete="off"
            onChange={(e) => setSearchPhrase(e.target.value)}
          />
        </form>
      </div>
      {/* Games */}
      <div className="flex flex-wrap justify-center gap-5">
        {handleSearchFilter().map((game) => (
          <GameCard key={game.id} game={game} handleChooseGame={handleChooseGame} />
        ))}
      </div>
    </div>
  );
}

export default List;
