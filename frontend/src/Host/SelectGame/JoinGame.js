import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../SocketFactory/mySocketFactory";
import { messageType, chatMessage } from "../../SocketFactory/message";
import axios from "axios";

function JoinGame(props) {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    axios
      .post(`http://localhost:8080/api/v1/games/new/${props.selectedId}`)
      .then((res) => {
        setPin(res.data.pin);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.selectedId]);

  function handleClick() {
    navigate(`/main-game/${pin}/${props.selectedId}`);
    client.publish({
      destination: `/app/chat/${props.pin}.startGame`,
      body: chatMessage("host", "", messageType.START_GAME),
    });
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
      <button
        className="border p-6 rounded-lg bg-gray-100 shadow-md shadow-sky-600 hover:bg-gray-200 hover:shadow-sky-700"
        onClick={() => handleClick()}
      >
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
