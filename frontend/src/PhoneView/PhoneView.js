import React from "react";
import NavBar from "../NavBar/Navbar";
import "./phoneView.css";
import UserGuide from "./UserGuide/UserGuide";
function PhoneView() {
  const [showUserGuide, setShowUserGuide] = React.useState(false);

  return (
    <div className="game-voting">
      {<NavBar />}
      <h1>Game Voting</h1>
      <div className="user-guide__slider">
        <button className="user-guide__slider__button">
          <div
            className="user-guide__slider__button__arrow"
            onClick={() => setShowUserGuide(!showUserGuide)}
          >
            Pokaż
          </div>
        </button>
        {showUserGuide && <UserGuide />}
      </div>
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

export default PhoneView;
