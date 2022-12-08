import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { messageType, chatMessage } from "../../../services/SocketFactory/message";
import Question from "./Question/Question";
import client from "../../../services/SocketFactory/mySocketFactory";
import useGame from "../../../hooks/useGame";

// funkcja callback, już w "głównym" komponencie
// main game function
// Tutaj będzie najwięcej zabawy :) good luck
function callback(message) {
  if (message.body) {
    const parsed = JSON.parse(message.body);
    // console.log(parsed);
  } else {
    console.log("got empty message");
  }
}

function MainGame() {
  let params = useParams();
  const gamedata = useGame(params.id);
  console.log(gamedata);
  useEffect(() => {
    client.activate();
    client.onConnect = (frame) => {
      client.subscribe(`/topic/public/${params.pin}`, callback);
    };
  }, [params.pin]);

  return (
      <div className="game-board">
        <Question question={"Jak sie masz?"} />
      </div>
  );
}

export default MainGame;
