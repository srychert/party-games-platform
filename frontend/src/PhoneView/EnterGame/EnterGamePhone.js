import React from "react";
import { useState, useEffect } from "react";
import { messageType, chatMessage } from "../../SocketFactory/message";
import client from "../../SocketFactory/mySocketFactory";
import PhoneView from "../GameVoting/PhoneView";
import Loding from "../Loding/Loding";

import "./join-game.css";

function EnterGamePhone() {
  const [pin, setPin] = useState("");
  const [name, setName] = useState("");
  const [connected, setConnected] = useState(client.connected);
  // narazie nie ma opcji dostać się do gry, bo serwer nie ma takiego typu wiadomości
  // można tutaj zmianiac stan gry
  const [gameState, setGameState] = useState("playing");

  useEffect(() => {
    if (client.connected !== undefined) setConnected(client.connected);
  }, []);

  const callback = function (message) {
    if (message.type === messageType.GAME_START) {
      setGameState("playing");
    }
    if (message.body) {
      const parsed = JSON.parse(message.body);
      console.log(parsed);
      console.log(client.connected);
    } else {
      console.log("got empty message");
    }
  };

  const HanldeSubmit = (e) => {
    e.preventDefault();
    client.activate();
    client.onConnect = (frame) => {
      client.subscribe(`/topic/public/${pin}`, callback);
      client.publish({
        destination: `/app/chat/${pin}.newUser`,
        body: chatMessage(name, "", messageType.CONNECT),
      });
      setConnected(true);
    };
  };
  return (
    <div className="new-game">
      {!connected && (
        <form>
          <div className="pin">
            <label htmlFor="pin">PIN</label>
            <input
              type="text"
              name="pin"
              id="pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </div>
          <div className="name">
            <label htmlFor="name">Nick</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button type="submit" onClick={(e) => HanldeSubmit(e)}>
            Dołącz do gry
          </button>
        </form>
      )}
      {(connected && gameState === "playing" && (
        <PhoneView wsClient={client} nick={name} pin={pin} />
      )) ||
        (connected && gameState === "waiting" && <Loding />)}
    </div>
  );
}

export default EnterGamePhone;
