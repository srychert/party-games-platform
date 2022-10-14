import React from "react";
import { Link } from "react-router-dom";
import "./startgame.css";
function NewGame() {
  return (
    <div className="new-game">
      <h1>Nowa gra</h1>
      <div className="new-game__start">
        <Link to="/game_voting">
          <button className="new-game__start-button">Rozpocznij grę</button>
        </Link>
      </div>
    </div>
  );
}

export default NewGame;
