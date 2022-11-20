import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import client from "../../SocketFactory/mySocketFactory";
import JoinGame from "./JoinGame";

function SelectGame() {
  const [games, setGames] = React.useState([]);
  const [selectedGame, setSelectedGame] = React.useState("");
  const [selectedGameId, setSelectedGameId] = React.useState("");
  const [pin, setPin] = React.useState("");
  const [players, setPlayers] = React.useState([12222, 2, 3, 4, 5, 6, 7]);

  function handleClick(id) {
    setSelectedGame(true);
    setSelectedGameId(id);
  }

  const callback = function (message) {
    if (message.body) {
      const parsed = JSON.parse(message.body);
      setPlayers((prev) => [...prev, parsed.sender]);
    } else {
      console.log("got empty message");
    }
  };
  useEffect(() => {
    if (selectedGame) {
      client.activate();
      client.onConnect = (frame) => {
        client.subscribe(`/topic/public/${pin}`, callback);
      };
    }
  }, [pin, selectedGame]);

  useEffect(() => {
    if (selectedGame) {
      axios
        .post(`http://localhost:8080/api/v1/games/new/${selectedGameId}`)
        .then((res) => {
          setPin(res.data.pin);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedGame, selectedGameId]);

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
      {(!selectedGame && (
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
      )) || (
        <JoinGame pin={pin} selectedId={selectedGameId} players={players} />
      )}
    </div>
  );
}

export default SelectGame;
