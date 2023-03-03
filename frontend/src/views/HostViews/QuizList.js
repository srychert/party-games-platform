import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { CgProfile } from 'react-icons/cg';
import { IconContext } from 'react-icons';
import { useCookies } from 'react-cookie';
import { useGames } from '../../hooks/useGames';
import Loading from '../Loading';

function QuizList() {
  const [cookies, setCookie] = useCookies();
  const auth = useAuth();
  let navigate = useNavigate();
  const { isLoading, isError, data: games, error } = useGames();

  const handleShowProfile = () => {
    navigate(`/profile`);
  };

  const handleChooseGame = (gameID) => {
    navigate(`/host/${gameID}`);
  };

  const handleLogout = () => {
    auth.logout();
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="h-screen w-screen overflow-x-hidden p-10">
      <div className="flex flex-col">
        <div className="mb-5 flex w-full items-center justify-between">
          <Link to="/" className="button">
            Back
          </Link>
          <div className="flex items-center justify-center gap-4">
            <button className="button" onClick={handleLogout}>
              Logout
            </button>

            <div
              className="flex cursor-pointer flex-col items-center justify-center"
              onClick={handleShowProfile}
            >
              <IconContext.Provider value={{ size: '4em' }}>
                <CgProfile />
              </IconContext.Provider>
              <span>{cookies.user}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-5">
          {games.map((game) => {
            return (
              <div className="game-card aspect-square w-[300px] bg-white" key={game.id}>
                <div className="game-noPlayed">{game.totalTimesPlayed}</div>
                <div className="flex h-full flex-col">
                  <h2 className="border-b-2 border-sky-300 text-2xl capitalize">
                    {game.title}
                  </h2>
                  <div>
                    <div className="max-h-8 overflow-hidden p-1 font-bold">
                      {game.createdBy}
                    </div>
                    <div className="max-h-24 overflow-hidden p-1">{game.description}</div>
                  </div>
                  <button
                    className="button mt-auto"
                    onClick={() => handleChooseGame(game.id)}
                  >
                    Graj
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default QuizList;