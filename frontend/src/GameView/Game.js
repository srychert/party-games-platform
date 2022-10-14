import React from "react";
import NavBar from "../NavBar/Navbar";
import "./gameview.css";
function GameVoting() {
  return (
    <div className="game-voting">
      {<NavBar />}
      <h1>Game Voting</h1>
      <main>
        <button className="game-voting__game__button">
          <div className="game-voting__game">Odpowiedź 1</div>
        </button>
        <button className="game-voting__game__button">
          <div className="game-voting__game">Odpowiedź 2</div>
        </button>
        <button className="game-voting__game__button">
          <div className="game-voting__game">Odpowiedź 3</div>
        </button>
        <button className="game-voting__game__button">
          <div className="game-voting__game">Odpowiedź 4</div>
        </button>
      </main>
    </div>
  );
}

export default GameVoting;
