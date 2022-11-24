import axios from "axios";
import React from "react";
import { useEffect } from "react";

import JoinGame from "./JoinGame";

function SelectGame() {
  const [games, setGames] = React.useState([]);
  const [gameID, setGameID] = React.useState("");

  // Pobiera wszystkie gry z bazy danych
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/games")
      .then((res) => {
        setGames(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col items-center h-screen w-screen">
      {(!gameID && (
        <div>
          {games.map((game) => {
            return (
              <div
                className="flex flex-col border p-6 rounded-lg shadow-md shadow-sky-600 relative"
                key={game.id}
              >
                <div className="absolute top-0 right-1 border rounded-lg shadow-sm shadow-sky-500 p-2">
                  {game.totalTimesPlayed}
                </div>
                <div className="Game">
                  <div className="border-b-2 border-sky-300 p-3">
                    {game.description}
                  </div>
                  <div className="p-1">{game.createdBy}</div>
                  <button className="button" onClick={() => setGameID(game.id)}>
                    Graj
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )) || <JoinGame selectedId={gameID} />}
    </div>
  );
}

export default SelectGame;
