import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import usePin from '../../hooks/usePin';
import Back from '../../components/Back/Back';
import { SockJsClientDefaults } from '../../services/SockJsClientDefaults';
import { TYPES } from '../../services/SocketMessage';

function QuizRoom() {
  const navigate = useNavigate();
  const { id } = useParams();
  const pin = usePin(id);
  const [players, setPlayers] = useState([]);

  const client = useRef(null);

  const handleConnect = () => {
    console.log('Connected!');
  };

  const onMessageReceived = (msg) => {
    console.log(msg);

    if (msg.type === TYPES.JOINED) {
      setPlayers([...players, { nick: msg.sender, id: msg.content }]);
    }
  };
  // Game start button handler
  const handleClick = () => {
    client.current.sendMessage(`/app/quizroom/${pin}/host`, {
      type: TYPES.START,
      sender: 'HOST',
      content: '',
    });
    navigate(`/host/${id}/quiz`, {
      state: { players: players },
    });
  };

  return (
    <>
      <SockJsClientDefaults
        topics={[`/topic/quizroom/${pin}`, `/topic/quizroom/${pin}/host`]}
        onConnect={handleConnect}
        onDisconnect={console.log('Disconnected!')}
        onMessage={(msg) => onMessageReceived(msg)}
        ref={client}
      />
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
    </>
  );
}

export default QuizRoom;
