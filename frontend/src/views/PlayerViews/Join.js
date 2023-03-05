import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Back from '../../components/Back/Back';
import { createMessage, TYPES } from '../../services/SocketMessage';
import { useCookies } from 'react-cookie';

function Join(props) {
  const { client, setTopics, setHandleMessage } = props;
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [nick, changeNick] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();

  const handleJoin = (event) => {
    event.preventDefault();
    client.current.sendMessage(`/app/quizroom/${pin}`, createMessage(TYPES.JOIN, nick));
  };

  const handleMessage = (msg) => {
    console.log(msg);
    switch (msg.type) {
      case TYPES.JOINED:
        setCookie('player_id', msg.content, { path: '/' });
        setCookie('nick', msg.sender, { path: '/' });
        navigate(`/player/quiz/${pin}`);
        break;

      case TYPES.DUPLICATE_NICK:
        setError('Duplicate nick');
        break;
      case TYPES.NO_ROOM:
        setError('No room with this pin');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setTopics([`/topic/quizroom/${pin}`, `/user/topic/reply`]);
    setHandleMessage({ fn: handleMessage });
  }, [pin]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Back to={'/'} />
      <form onSubmit={handleJoin} className="form">
        <div className="flex flex-col p-2">
          <label htmlFor="pin">Pin</label>
          <input
            className="form-input"
            type="text"
            name="pin"
            id="pin"
            autoComplete="off"
            onChange={(e) => setPin(e.target.value)}
          />
        </div>
        <div className="flex flex-col p-2">
          <label htmlFor="nick">Nick</label>
          <input
            className="form-input"
            type="text"
            name="nick"
            id="nick"
            autoComplete="off"
            onChange={(e) => changeNick(e.target.value)}
          />
        </div>
        <div className="text-red-500">{error}</div>
        <button type="submit" className="button">
          Dołącz
        </button>
      </form>
    </div>
  );
}

export default Join;
