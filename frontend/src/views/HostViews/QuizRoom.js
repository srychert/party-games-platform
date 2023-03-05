import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import usePin from '../../hooks/usePin';
import Back from '../../components/Back/Back';
import { createMessage, TYPES } from '../../services/SocketMessage';

function QuizRoom(props) {
  const { client, setTopics, setHandleMessage } = props;
  const navigate = useNavigate();
  const { id } = useParams();
  const pin = usePin(id);
  const [players, setPlayers] = useState([]);

  const onMessageReceived = (msg) => {
    console.log(msg);

    if (msg.type === TYPES.JOINED) {
      setPlayers([...players, { nick: msg.sender, id: msg.content }]);
    }
  };

  // Game start button handler
  const handleClick = () => {
    client.current.sendMessage(
      `/app/quizroom/${pin}/host`,
      createMessage(TYPES.START_GAME, 'HOST')
    );
    navigate(`/host/${id}/quiz-room/${pin}`);
  };

  useEffect(() => {
    setTopics([`/topic/quizroom/${pin}/host`, `/user/topic/reply`]);
    setHandleMessage({ fn: onMessageReceived });
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
            {player.nick}
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizRoom;
