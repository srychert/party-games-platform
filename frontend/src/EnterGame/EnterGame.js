import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./entergame.css";
import axios from "axios";

function EnterGame() {
  let params = useParams();
  const [pin, setPin] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios
      .post(`http://localhost:5000/api/v1/games/new/${params.id}`)
      .then((res) => {
        setPin(res.data.pin);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);
  // TODO
  // gracz może dołączyć do gry, wyświetla aktywnych graczy (websocket)
  // WEBSOCKET
  return (
    <div className="new-game">
      <h1>Nowa gra</h1>
      <div className="new-game__start">
        <div className="new-game__pin">
          <h2>Twój PIN</h2>
          <div className="new-game-pin__content">{pin}</div>
        </div>
        <Link to={`/main-game/${params.id}`}>
          <button className="new-game__start-button">Rozpocznij grę</button>
        </Link>
        <div className="new-game__players">
          <h2>Gracze</h2>
          <div className="new-game-players__content">
            {players.map((player) => (
              <div>{player}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnterGame;
