import React, { useEffect } from "react";
import "./mainGame.css";
import Map from "./Map/Map";
import { useParams } from "react-router-dom";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "axios";

const socket = new SockJS("http://localhost:8080/chat-example");
const stompClient = Stomp.over(socket);

function MainGame() {
  let params = useParams();
  const [chat, setChat] = React.useState([]);
  const [pin, setPin] = React.useState(params.pin);
  useEffect(() => {
    axios
      .post(`http://localhost:8080/api/v1/games/new/${params.id}`)
      .then(function (response) {
        console.log(response);
        setPin(response.data.pin);
      });
  }, [params.id]);
  useEffect(() => {
    stompClient.connect({}, function (frame) {
      console.log("Connected: " + frame);
      stompClient.subscribe(`/topic/public/${pin}`, function (message) {
        setChat((chat) => [...chat, message.body]);
      });
    });
  }, [pin]);
  return (
    <div className="main-game-screen">
      <div className="main-game-screen__content">
        <main>
          <div className="main-game-screen-equipment">
            <div className="main-game-screen-equipment__content">
              <div>{chat}</div>
            </div>
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
