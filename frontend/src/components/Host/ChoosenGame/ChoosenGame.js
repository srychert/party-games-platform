import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../../services/SocketFactory/mySocketFactory";
import {
  messageType,
  chatMessage,
} from "../../../services/SocketFactory/message";
import usePin from "../../../hooks/usePin";

function ChoosenGame(props) {
  const navigate = useNavigate();
  const pin = usePin(props.selectedId);
  const [players, setPlayers] = useState([]);

  function handleClick() {
    client.publish({
      destination: `/app/chat/${props.pin}.startGame`,
      body: chatMessage("host", "", messageType.STARTGAME),
    });
    navigate(`/host/${pin}/${props.selectedId}`);
  }

  function callback(message) {
    if (message.body) {
      const parsed = JSON.parse(message.body);
      setPlayers((prev) => [...prev, parsed.sender]);
    } else {
      console.log("got empty message");
    }
  }

  useEffect(() => {
    client.activate();
    client.onConnect = (frame) => {
      client.subscribe(`/topic/public/${pin}`, callback);
    };
  }, [pin]);

  return (
    <div className="flex h-screen w-screen flex-col items-center ">
      <div className="m-10 border-b-2 border-blue-500 p-5 text-9xl">{pin}</div>
      <button className="button" onClick={() => handleClick()}>
        Rozpocznij grę
      </button>
      <div className="flex flex-row justify-between">
        {players.map((player, index) => (
          <div
            className="m-3 animate-wiggle rounded-lg border bg-gradient-to-r from-blue-600 to-blue-200 p-3 shadow-sm"
            key={index}
          >
            {player}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChoosenGame;
