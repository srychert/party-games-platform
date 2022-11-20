import axios from "axios";
import React from "react";
import { useEffect } from "react";

import JoinGame from "./JoinGame";

function SelectGame() {
  const [games, setGames] = React.useState([]);
  const [pin, setPin] = React.useState("");
  const [gameID, setGameID] = React.useState("");

  // Pobiera pin z serwera
  function handleClick(id) {
    axios
      .post(`http://localhost:8080/api/v1/games/new/${id}`)
      .then((res) => {
        setPin(res.data.pin);
        setGameID(res.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
      {(!pin && (
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
                  <button
                    className="border rounded-lg p-2 shadow-sm shadow-sky-500"
                    onClick={() => handleClick(game.id)}
                  >
                    Graj
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )) || <JoinGame pin={pin} selectedId={gameID} />}
    </div>
  );
}

export default SelectGame;
