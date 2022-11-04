import React from "react";
import HeroStats from "./HeroStats/HeroStats";
import UserGuide from "./UserGuide/UserGuide";
import "./phoneView.css";
function PhoneView() {
  const [showUserGuide, setShowUserGuide] = React.useState(false);

  return (
    <div className="game-voting">
      <div className="menu">
        <div className="user-guide__slider">
          {showUserGuide && <UserGuide />}
          {!showUserGuide && <HeroStats />}
        </div>
        <div className="user-guide__slider__button__arrow">
          <button
            className="user-guide__slider__button"
            onClick={() => setShowUserGuide(!showUserGuide)}
          >
            Pokaż
          </button>
        </div>
      </div>
      <main className="phoneView">
        {[1, 2, 3, 4].map((item) => (
          <div className="game-voting__item" id={item}>
            <button className="game-voting__item__button">
              Odpowiedź {item}
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}

export default PhoneView;
