import { useNavigate } from 'react-router-dom';

import { useQuizzes } from '../../hooks/useQuizzes';
import Loading from '../Loading';
import { useState } from 'react';
import GameCard from '../../components/GameCard/GameCard';

function QuizList() {
  let navigate = useNavigate();
  const { isLoading, isError, data: games, error } = useQuizzes();

  const handleChooseGame = (gameID) => {
    navigate(`/host/${gameID}`);
  };

  const [gameName, setGameName] = useState('');

  const handleSearchFilter = () => {
    const filteredGames = games.filter((game) => {
      return game.title.toLowerCase().includes(gameName.toLowerCase());
    });
    return filteredGames;
  };

  const silderFilter = () => {
    const filteredGames = games.filter((game) => {
      return game.totalTimesPlayed > 10;
    });
    return filteredGames;
  };

  return (
    <div className="h-screen w-screen overflow-x-hidden">
      {isLoading && <Loading />}
      {isError && <span>Error: {error.message}</span>}
      {!isLoading && !isError && (
        <div className="flex flex-col">
          {/* Filter */}
          <div className="m-2 flex items-center justify-center">
            <form className="flex flex-col">
              <label htmlFor="gameName">Nazwa gry</label>
              <input
                className="form-input"
                type="text"
                name="gameName"
                id="gameName"
                autoComplete="off"
                onChange={(e) => setGameName(e.target.value)}
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
      )}
    </div>
  );
}

export default QuizList;
