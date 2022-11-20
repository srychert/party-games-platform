import React from "react";
import HeroStats from "./HeroStats/HeroStats";
import UserGuide from "./UserGuide/UserGuide";
import { messageType, chatMessage } from "../../SocketFactory/message";

import { useEffect } from "react";
import Loding from "../Loding/Loding";

import client from "../../SocketFactory/mySocketFactory";

function PhoneView(props) {
  const [showUserGuide, setShowUserGuide] = React.useState(false);
  const [gameState, setGameState] = React.useState("waiting");

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

  useEffect(() => {
    client.activate();
    client.onConnect = (frame) => {
      client.subscribe(`/topic/public/${props.pin}`, callback);
      client.publish({
        destination: `/app/chat/${props.pin}.newUser`,
        body: chatMessage(props.nick, "", messageType.CONNECT),
      });
    };
  }, []);

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
        <div className="game-voting">
          <div className="menu">
            <div className="user-guide__slider">
              {(showUserGuide && <UserGuide />) || <HeroStats />}
            </div>
            <div className="user-guide__slider__button__arrow">
              <button
                className="user-guide__slider__button"
                onClick={() => setShowUserGuide(!showUserGuide)}
              >
                Pokaż
              </button>
            </div>
          </div>
          <main className="phoneView">
            {[1, 2, 3, 4].map((item) => (
              <div
                className="game-voting__item"
                id={item}
                onClick={() => handleClick(item)}
              >
                Odpowiedź {item}
              </div>
            ))}
          </main>
        </div>
      )}
    </div>
  );
}

export default PhoneView;
