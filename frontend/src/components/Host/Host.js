import useGames from '../../hooks/useGames';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import Back from '../Back/Back';

function Host() {
  const auth = useAuth();
  let navigate = useNavigate();
  const games = useGames();
  const [showDetails, setShowDetails] = useState(false);
  const [id, setId] = useState(null);
  // To do zmiany po ogarnięciu logowania
  // -------------------------------------
  const handleShowProfile = () => {
    navigate(`/profile`);
  };
  // -------------------------------------
  const handleChooseGame = (gameID) => {
    navigate(`/host/${gameID}`);
  };
  const handleLogout = () => {
    auth.logout();
  };
  const handleMouseOver = (index) => {
    setId(index);
    setShowDetails(true);
  };
  const handleMouseOut = () => {
    setShowDetails(false);
    setId(null);
  };
  return (
    <div className="h-screen w-screen overflow-x-hidden p-10">
      <Back to="/" />
      <div className="absolute right-10 m-2 flex flex-row items-center justify-center">
        <button className="button" onClick={handleLogout}>
          Logout
        </button>
        <div className="m-5 flex flex-col items-center justify-center">
          <img
            className="image"
            alt="Ikona prfilu"
            onClick={handleShowProfile}
            src="https://styles.redditmedia.com/t5_2tc6s/styles/communityIcon_vn92glo5ugy51.png"
          ></img>
          <span className="m-2">{auth.cookies.user}</span>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div>
          {games.map((game, index) => {
            return (
              <div
                className="game-card m-5"
                key={game.id}
                onMouseOver={() => handleMouseOver(index)}
                onMouseOut={() => handleMouseOut()}
              >
                <div className="game-noPlayed">{game.totalTimesPlayed}</div>
                <div>
                  <div className="border-b-2 border-sky-300 p-3">{game.title}</div>
                  {showDetails && id === index ? (
                    <div className="transition-all">
                      <div className="p-1">{game.createdBy}</div>
                      <div className="p-1">{game.description}</div>
                    </div>
                  ) : null}
                  <button
                    className="button m-5"
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

export default Host;
