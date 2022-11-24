import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../SocketFactory/mySocketFactory";
import { messageType, chatMessage } from "../../SocketFactory/message";
import usePin from "../../hooks/usePin";

function JoinGame(props) {
  const navigate = useNavigate();
  const pin = usePin(props.selectedId);
  const [players, setPlayers] = useState([]);

  function handleClick() {
    client.publish({
      destination: `/app/chat/${props.pin}.startGame`,
      body: chatMessage("host", "", messageType.STARTGAME),
    });
    navigate(`/main-game/${pin}/${props.selectedId}`);
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
    <div className="flex flex-col items-center h-screen w-screen ">
      <div className="text-9xl p-5 m-10 border-b-2 border-blue-500">{pin}</div>
      <button className="button" onClick={() => handleClick()}>
        Rozpocznij grę
      </button>
      <div className="flex flex-row justify-between">
        {players.map((player, index) => (
          <div
            className="p-3 border rounded-lg m-3 bg-gradient-to-r from-blue-600 to-blue-200 shadow-sm"
            key={index}
          >
            {player}
          </div>
        ))}
      </div>
    </div>
  );
}

export default JoinGame;
