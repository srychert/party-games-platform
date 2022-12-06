import React, { useEffect, useState } from "react";
import client from "../../../services/SocketFactory/mySocketFactory";
import {
  messageType,
  chatMessage,
} from "../../../services/SocketFactory/message";
import Loding from "../Loding/Loding";
import { useAuth } from "../../../hooks/useAuth";

function PhoneView(props) {
  const [gameState, setGameState] = useState("playing");
  const { cookies } = useAuth();
  const nick = cookies.nick;

  // alert user kiedy wyjdzie z gry
  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);

  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue =
      "Uważaj! Jeśli opuścisz grę, nie będziesz mógł do niej wrócić.";
  };
  const callback = function (message) {
    if (message.type === messageType.STARTGAME) {
      setGameState("playing");
    }
  };
  // wsClient init i jego logika
  useEffect(() => {
    client.activate();
    client.onConnect = (frame) => {
      client.subscribe(`/topic/public/${props.pin}`, callback);
      client.publish({
        destination: `/app/chat/${props.pin}.newUser`,
        body: chatMessage(nick, "", messageType.CONNECT),
      });
    };
  }, [props.pin, nick]);

  // Odpowiedź na pytanie
  const handleClick = (answer) => {
    if (client) {
      client.publish({
        destination: `/app/chat/${props.pin}.send`,
        // zmienić message type na odpowiedni
        body: chatMessage(nick, answer, messageType.CHAT),
        skipContentLengthHeader: true,
      });
    }
  };

  return (
    <div>
      {gameState === "waiting" ? (
        <Loding />
      ) : (
        <div className="h-screen">
          <div className="h-1/5">{nick}</div>
          <div className="grid h-4/5 grid-cols-2 grid-rows-2 gap-2 overflow-hidden">
            <button
              className={`box row-start-1 row-end-1`}
              id="1"
              onClick={() => handleClick(1)}
            >
              Odpowiedź 1
            </button>
            <button
              className={`box col-span-2 col-start-2`}
              id="2"
              onClick={() => handleClick(2)}
            >
              Odpowiedź 2
            </button>
            <button
              className={`box col-span-2 col-start-2`}
              id="3"
              onClick={() => handleClick(3)}
            >
              Odpowiedź 3
            </button>
            <button
              className={`box row-start-2 row-end-2`}
              id="4"
              onClick={() => handleClick(4)}
            >
              Odpowiedź 4
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhoneView;
