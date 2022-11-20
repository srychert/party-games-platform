import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../SocketFactory/mySocketFactory";

function JoinGame(props) {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([12222, 2, 3, 4, 5, 6, 7]);
  function handleClick() {
    console.log(props);
    navigate(`/main-game/${props.pin}/${props.selectedId}`);
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
      client.subscribe(`/topic/public/${props.pin}`, callback);
    };
  }, [props.pin]);

  return (
    <div className="flex flex-col items-center h-screen w-screen ">
      <div className="text-9xl p-5 m-10 border-b-2 border-blue-500">
        {props.pin}
      </div>
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
