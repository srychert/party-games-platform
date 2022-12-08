import useGames from '../../hooks/useGames';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import Back from '../Common/Back';

function Host() {
  const auth = useAuth();
  let navigate = useNavigate();
  const games = useGames();
  const [showDetails, setShowDetails] = useState(false);
  // To do zmiany po ogarnięciu logowania
  // -------------------------------------
  const handleShowProfile = () => {
    navigate(`/profile/${auth.cookies.user}`);
  };
  // -------------------------------------
  const handleChooseGame = (gameID) => {
    navigate(`/host/${gameID}`);
  };
  const handleLogout = () => {
    auth.logout();
  };
  const handleMouseOver = () => {
    setShowDetails(true);
  };
  const handleMouseOut = () => {
    setShowDetails(false);
  };

  return (
    <div className="h-screen w-screen p-10">
      <Back to="/" />
      <div className="absolute right-10 m-2 flex flex-row items-center justify-center">
        <button className="button" onClick={handleLogout}>
          Logout
        </button>
        <div className="m-5 flex flex-col items-center justify-center">
          <img
            className="h-20 w-20 cursor-pointer rounded-full border border-sky-300"
            alt="Ikona prfilu"
            onClick={handleShowProfile}
            src="https://styles.redditmedia.com/t5_2tc6s/styles/communityIcon_vn92glo5ugy51.png"
          ></img>
          <span className="m-2">{auth.cookies.user}</span>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div>
          {games.map((game) => {
            return (
              <div
                className="relative flex flex-col rounded-lg border p-6 shadow-md shadow-sky-600"
                key={game.id}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                <div className="absolute top-1 right-1 rounded-lg border p-2 shadow-sm shadow-sky-500">
                  {game.totalTimesPlayed}
                </div>
                <div>
                  <div className="border-b-2 border-sky-300 p-3">{game.title}</div>
                  {showDetails ? (
                    <div>
                      <div className="p-1">{game.createdBy}</div>
                      <div className="p-1">{game.description}</div>
                    </div>
                  ) : null}
                  <button className="button" onClick={() => handleChooseGame(game.id)}>
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

export default Host;
