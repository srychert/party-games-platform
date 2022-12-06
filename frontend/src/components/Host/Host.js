import useGames from "../../hooks/useGames";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Host() {
  let navigate = useNavigate();
  const games = useGames();
  const auth = useAuth();
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

  return (
    <div>
      <div className="hover: absolute right-0 top-0 m-2 flex cursor-pointer flex-row items-center justify-center">
        <div onClick={handleShowProfile} className="flex flex-row">
          <span className="m-2">Login</span>
          <img
            className="flex h-20 w-20 items-center justify-center rounded-full border border-sky-300"
            alt="Ikona prfilu"
            src={
              "https://styles.redditmedia.com/t5_2tc6s/styles/communityIcon_vn92glo5ugy51.png"
            }
          ></img>
        </div>
        <button className="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="flex h-screen w-screen flex-col items-center">
        <div>
          {games.map((game) => {
            return (
              <div
                className="relative flex flex-col rounded-lg border p-6 shadow-md shadow-sky-600"
                key={game.id}
              >
                <div className="absolute top-0 right-1 rounded-lg border p-2 shadow-sm shadow-sky-500">
                  {game.totalTimesPlayed}
                </div>
                <div className="Game">
                  <div className="border-b-2 border-sky-300 p-3">
                    {game.description}
                  </div>
                  <div className="p-1">{game.createdBy}</div>
                  <button
                    className="button"
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