import React from "react";
import NavBar from "../NavBar/Navbar";
import "./mainGame.css";
function MainGame() {
  return (
    <div className="main-game-screen">
      {<NavBar />}
      <div className="main-game-screen__content">
        <h1>Witaj w grze</h1>
        <p>
          W tej grze będziesz miał do wyboru 4 odpowiedzi. Wybierz jedną z nich
          i ciesz się grą.
        </p>
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
