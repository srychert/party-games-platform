import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import client from "../../SocketFactory/mySocketFactory";

import "./select-game.css";

function SelectGame() {
  const [games, setGames] = React.useState([]);
  const [selectedGame, setSelectedGame] = React.useState("");
  const [selectedGameId, setSelectedGameId] = React.useState("");
  const [pin, setPin] = React.useState("");
  const [players, setPlayers] = React.useState([
    12222, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22,
  ]);

  function handleClick(id) {
    setSelectedGame(true);
    setSelectedGameId(id);
  }

  function randomNumber() {
    return Math.floor(Math.random() * 1000);
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
    <div className="Main_select">
      {(!selectedGame && (
        <div className="Select_game">
          {games.map((game) => {
            return (
              <div className="card" key={game.id}>
                <div className="games_count">{game.totalTimesPlayed}</div>
                <div className="Game">
                  <div className="Game_title">{game.description}</div>
                  <div className="Game_createdBy">{game.createdBy}</div>
                  <div className="button">
                    <button onClick={() => handleClick(game.id)}>Graj</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )) || (
        <div className="new-game">
          <div className="new-game__start">
            <div className="new-game__pin">
              <div className="new-game-pin__content">{pin}</div>
            </div>
            <div className="new-game_start-button">
              <Link to={`/main-game/${pin}/${selectedGameId}`}>
                <button className="new-game__start-button">
                  Rozpocznij grę
                </button>
              </Link>
            </div>
            <div className="new-game__players">
              <div className="new-game-players__content">
                {players.map((player) => (
                  <div
                    className="player"
                    style={{ top: randomNumber(), left: randomNumber() }}
                  >
                    {player}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectGame;
