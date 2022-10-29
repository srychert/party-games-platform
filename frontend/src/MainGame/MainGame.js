import React from "react";
import "./mainGame.css";
function MainGame() {
  return (
    <div className="main-game-screen">
      <div className="main-game-screen__content">
        <main>
          <div className="main-game-screen-equipment">
            <div className="main-game-screen-equipment__content">Equipment</div>
          </div>
          <div className="main-game-screen-map">
            <div className="main-game-screen-map__content">Mapa</div>
          </div>
          <div className="main-game-screen-quest">
            <div className="main-game-screen-quest__content">Main Quest</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainGame;
