import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./entergame.css";
function EnterGame() {
  // random number generator
  const [randomNumber, setRandomNumber] = React.useState(0);
  const [players, setPlayers] = React.useState([]);
  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 1000000));
  }, []);
  return (
    <div className="new-game">
      <h1>Nowa gra</h1>
      <div className="new-game__start">
        <div className="new-game__pin">
          <h2>Twój PIN</h2>
          <div className="new-game-pin__content">
            {Math.floor(randomNumber / 1000)} {randomNumber % 1000}
          </div>
        </div>
        <Link to="/phone-view">
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
