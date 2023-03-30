import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createMessage, TYPES } from '../../services/SocketMessage';
import Loading from '../Loading';
import Error from '../Error';

function getPin(client, id) {
  client.current.sendMessage(
    `/app/create/quizroom`,
    createMessage(TYPES.CREATE_ROOM, 'HOST', id)
  );
}

function QuizRoom(props) {
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

  const onMessageReceived = (msg) => {
    console.log(msg);

    switch (msg.type) {
      case TYPES.CREATED:
        setPin(msg.content);
        setLoading(false);
        break;

      case TYPES.NO_PIN:
        setError('Try again later');
        setLoading(false);
        break;

      case TYPES.JOINED:
        setPlayers([...players, { nick: msg.sender, id: msg.content }]);
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
    // client.current.sendMessage(
    //   `/app/quizroom/${pin}/host`,
    //   createMessage(TYPES.START_GAME, 'HOST')
    // );
    navigate(`/host/${id}/quiz-room/${pin}`);
  };

  useEffect(() => {
    setTopics([
      `/topic/create/quizroom`,
      `/topic/quizroom/${pin}/host`,
      `/user/topic/reply`,
    ]);
    setHandleMessage({ fn: onMessageReceived });
  }, [pin]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center ">
      <div className="pin">{pin}</div>
      <button className="buttonRegular" onClick={() => handleClick()}>
        Rozpocznij grę
      </button>
      <div className="flex flex-row justify-between">
        {players.map((player, index) => (
          <div className="player-lobby animate-wiggle" key={index}>
            {player.nick}
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizRoom;
