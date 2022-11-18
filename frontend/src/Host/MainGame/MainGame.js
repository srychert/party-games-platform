import React, { useEffect } from "react";
import "./mainGame.css";
import Map from "./Map/Map";
import { useParams } from "react-router-dom";
import axios from "axios";
import { messageType, chatMessage } from "../../SocketFactory/message";
import client from "../../SocketFactory/mySocketFactory";

// funkcja callback, już w "głównym" komponencie
// main game function
// Tutaj będzie najwięcej zabawy :) good luck
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
      // Po renderze komponentu wysyłamy wiadomość do serwera, że zaczynamy grę
      client.publish({
        destination: "/app/chat.sendMessage",
        body: chatMessage("System", "", messageType.GAME_START),
      });
      // Serwer wyślę każdemu graczowi wiadomość że gra się zaczęła (GAME_START) i zmienią sobie stan na "playing"
    };
  }, [params.pin]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/games/${params.id}`)
      .then((res) => {
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
