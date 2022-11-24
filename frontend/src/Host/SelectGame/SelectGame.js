import { useState } from "react";
import JoinGame from "./JoinGame";
import useGames from "../../hooks/useGames";
import { useNavigate } from "react-router-dom";

function SelectGame() {
  let navigate = useNavigate();
  const games = useGames();
  const [gameID, setGameID] = useState("");

  const userID = localStorage.getItem("user");

  // Adam jakbyś czytał komentarze to tutaj masz endpoint do profilu gracza
  const handleShowProfile = () => {
    navigate(`/profile/${userID}`);
  };

  return (
    <div>
      <div
        className="hover: ursor-pointer absolute right-0 top-0 m-2 flex flex-row items-center justify-center"
        onClick={handleShowProfile}
      >
        <span className="m-2">Login</span>
        <img
          className="flex h-20 w-20 items-center justify-center rounded-full border hover:cursor-pointer"
          alt="Ikona prfilu"
          src={
            "https://styles.redditmedia.com/t5_2tc6s/styles/communityIcon_vn92glo5ugy51.png"
          }
        ></img>
      </div>
      <div className="flex h-screen w-screen flex-col items-center">
        {(!gameID && (
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
                      onClick={() => setGameID(game.id)}
                    >
                      Graj
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )) || <JoinGame selectedId={gameID} />}
      </div>
    </div>
  );
}

export default SelectGame;
