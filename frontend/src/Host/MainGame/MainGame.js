import React, { useEffect } from "react";
import "./mainGame.css";
import Map from "./Map/Map";
import { useParams } from "react-router-dom";
import axios from "axios";
import client from "../../SocketFactory/mySocketFactory";

// funkcja callback, już w "głównym" komponencie
// main game function
function callback(message) {
  if (message.body) {
    const parsed = JSON.parse(message.body);
    console.log(parsed);
  } else {
    console.log("got empty message");
  }
}

function MainGame() {
  let params = useParams();
  const [gamedata, setGamedata] = React.useState({});
  useEffect(() => {
    client.activate();
    client.onConnect = (frame) => {
      client.subscribe(`/topic/public/${params.pin}`, callback);
    };
  }, [params.pin]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/games/${params.id}`)
      .then((res) => {
        console.log(res.data);
        setGamedata(res.data);
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
            <div className="main-game-screen-equipment__content">
              Placeholder
              <div>{gamedata.description}</div>
            </div>
          </div>
          <div className="main-game-screen-map">
            <Map />
          </div>
          <div className="main-game-screen-quest">
            <div className="main-game-screen-quest__content">
              Placeholder
              {gamedata.mainQuest}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainGame;
