import React, { useEffect, useState } from "react";
import HeroStats from "./HeroStats/HeroStats";
import UserGuide from "./UserGuide/UserGuide";
import { messageType, chatMessage } from "../../SocketFactory/message";
import Loding from "../Loding/Loding";
import client from "../../SocketFactory/mySocketFactory";

function PhoneView(props) {
  const [showUserGuide, setShowUserGuide] = useState(false);
  const [gameState, setGameState] = useState("waiting");

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
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
        body: chatMessage(props.nick, "", messageType.CONNECT),
      });
    };
  }, [props.pin, props.nick]);

  // Odpowiedź na pytanie
  const handleClick = (answer) => {
    if (client) {
      client.publish({
        destination: `/app/chat/${props.pin}.send`,
        // zmienić message type na odpowiedni
        body: chatMessage(props.nick, answer, messageType.CHAT),
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
          <div className="h-1/5">
            {showUserGuide ? <UserGuide /> : <HeroStats />}
            <button
              className="button h-1/4"
              onClick={() => setShowUserGuide(!showUserGuide)}
            >
              Pokaż
            </button>
          </div>
          <div className="grid overflow-hidden grid-cols-2 grid-rows-2 gap-2 h-4/5">
            <button
              className={`box row-start-1 row-end-1`}
              id="1"
              onClick={() => handleClick(1)}
            >
              Odpowiedź 1
            </button>
            <button
              className={`box col-start-2 col-span-2`}
              id="2"
              onClick={() => handleClick(2)}
            >
              Odpowiedź 2
            </button>
            <button
              className={`box col-start-2 col-span-2`}
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
