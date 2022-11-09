import React, { useEffect } from "react";
import "./mainGame.css";
import Map from "./Map/Map";
import { useParams } from "react-router-dom";
function MainGame() {
  let params = useParams();
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/games/" + params.id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);

  return (
    <div className="main-game-screen">
      <div className="main-game-screen__content">
        <main>
          <div className="main-game-screen-equipment">
            <div className="main-game-screen-equipment__content">Equipment</div>
          </div>
          <div className="main-game-screen-map">
            <Map />
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
