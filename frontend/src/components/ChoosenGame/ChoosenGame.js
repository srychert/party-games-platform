import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import client from '../../services/SocketFactory/mySocketFactory';
import { messageType, chatMessage } from '../../services/SocketFactory/message';
import usePin from '../../hooks/usePin';
import Back from '../Back/Back';

function ChoosenGame() {
  const navigate = useNavigate();
  const { id } = useParams();
  const pin = usePin(id);
  const [players, setPlayers] = useState([]);

  function handleClick() {
    console.log(players);
    if (client.connected === true) {
      client.publish({
        destination: `/app/${pin}.startGame`,
        body: chatMessage('host', 'start', messageType.START_GAME),
      });
      client.deactivate().then(() => {
        navigate(`/host/${id}/${pin}`, { state: { players: players } });
      });
    } else {
      console.log('not connected');
    }
  }

  function callback(message) {
    if (message.body) {
      const parsed = JSON.parse(message.body);
      // TODO check if player with that sender is not already connected and send info back somehow
      setPlayers((prev) => [...prev, parsed.sender]);
    } else {
      console.log('got empty message');
    }
  }

  useEffect(() => {
    if (client.connected) {
      client.subscribe(`/topic/public/${pin}`, callback);
    } else {
      client.activate();
      client.onConnect = () => {
        client.subscribe(`/topic/public/${pin}`, callback);
      };
    }
  }, [pin]);

  return (
    <div className="flex h-screen w-screen flex-col items-center ">
      <Back to={`/host/`} />
      <div className="m-10 border-b-2 border-blue-500 p-5 text-9xl">{pin}</div>
      <button className="button" onClick={() => handleClick()}>
        Rozpocznij grę
      </button>
      <div className="flex flex-row justify-between">
        {players.map((player, index) => (
          <div
            className="animate-wiggle m-3 rounded-lg border bg-gradient-to-r from-blue-600 to-blue-200 p-3 shadow-sm"
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
