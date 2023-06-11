import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createMessage } from '../../services/SocketMessage';
import Loading from '../Loading';
import Error from '../Error';
import { TYPES } from '../../enums/MessageTypes';

function getPin(client, id) {
  client.current.sendMessage(
    `/app/create/game-room`,
    createMessage(TYPES.CREATE_ROOM, 'HOST', id)
  );
}

function GameRoom(props) {
  const { client, setTopics, setHandleMessage, setHandleConnect, connected } = props;
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pin, setPin] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (!pin && connected) {
      getPin(client, id);
    }
  }, [connected]);

  console.log(players);

  const onMessageReceived = (msg) => {
    console.log(msg);

    switch (msg.type) {
      case TYPES.CREATED:
        setPin(msg.content);
        setLoading(false);
        break;

      case TYPES.NO_PIN:
        setError('Try again later!');
        setLoading(false);
        break;

      case TYPES.JOINED:
        setPlayers((prev) => [...prev, { nick: msg.sender, id: msg.content }]);
        break;

      case TYPES.STARTED:
        setLoading(false);
        break;

      default:
        break;
    }
  };

  // Game start button handler
  const handleClick = () => {
    navigate(`/host/game/${id}/game-room/${pin}`);
  };

  useEffect(() => {
    setTopics([
      `/topic/create/game-room`,
      `/topic/game-room/${pin}`,
      `/topic/game-room/${pin}/host`,
      `/user/topic/reply`,
    ]);
    setHandleMessage({ fn: onMessageReceived });
  }, [pin]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="grid place-content-center gap-2">
      <div className="m-6 grid place-content-center border-b-2 border-purple-600 p-5 text-6xl sm:text-8xl">
        {pin}
      </div>
      <button className="button" onClick={() => handleClick()}>
        Start Game
      </button>
      <div className="mt-8 flex flex-wrap gap-2">
        {players?.map((player, index) => (
          <div
            className="animate-wiggle rounded-lg border bg-violet-600 p-3 text-gray-100 drop-shadow-md"
            key={index}
          >
            {player.nick}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameRoom;
