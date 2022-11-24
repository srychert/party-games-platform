import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { messageType, chatMessage } from "../../SocketFactory/message";

import Map from "./Map/Map";
import client from "../../SocketFactory/mySocketFactory";

import useGame from "../../hooks/useGame";

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
  const gamedata = useGame(params.id);
  // jakoś pobrać graczy z serwera i przekazać do mapy
  const [players, setPlayers] = React.useState([1, 2, 3]);
  useEffect(() => {
    client.activate();
    client.onConnect = (frame) => {
      client.subscribe(`/topic/public/${params.pin}`, callback);
      // Po renderze komponentu wysyłamy wiadomość do serwera, że zaczynamy grę
      client.publish({
        destination: "/app/chat.sendMessage",
        body: chatMessage("System", "", messageType.GAME_START),
      });
    };
  }, [params.pin]);

  return (
    <div className="grid h-screen grid-cols-3 grid-rows-2 gap-2 overflow-hidden">
      <div className="game-board row-start-1 row-end-1">
        EQ
        <div>{gamedata.description}</div>
      </div>
      <div className="game-board col-start-1 col-end-1 row-start-2 row-end-2">
        Placeholder
        {gamedata.mainQuest}
      </div>
      <div className="game-board col-span-2 col-start-2 row-start-1 row-end-3">
        <Map players={players} />
      </div>
    </div>
  );
}

export default MainGame;
