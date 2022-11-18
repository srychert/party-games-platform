import React from "react";
import HeroStats from "./HeroStats/HeroStats";
import UserGuide from "./UserGuide/UserGuide";
import { messageType, chatMessage } from "../../SocketFactory/message";
import "./phoneView.css";
import { useEffect } from "react";

function PhoneView(props) {
  const [showUserGuide, setShowUserGuide] = React.useState(false);
  const [wsClient, setWsClient] = React.useState(null);
  const [nick, setNick] = React.useState("");
  const [pin, setPin] = React.useState("");
  useEffect(() => {
    if (props) {
      setWsClient(props.wsClient);
      setNick(props.nick);
      setPin(props.pin);
    }
  }, [props]);
  const handleClick = (answer) => {
    if (wsClient) {
      wsClient.publish({
        destination: `/app/chat/${pin}.send`,
        body: chatMessage(nick, answer, messageType.CHAT),
        skipContentLengthHeader: true,
      });
    }
  };
  return (
    <div className="game-voting">
      <div className="menu">
        <div className="user-guide__slider">
          {showUserGuide && <UserGuide />}
          {!showUserGuide && <HeroStats />}
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
  );
}

export default PhoneView;
