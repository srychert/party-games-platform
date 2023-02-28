import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import client from '../../services/SocketFactory/mySocketFactory';
import { messageType, chatMessage } from '../../services/SocketFactory/message';
import Loading from '../Loading';
import Back from '../../components/Back/Back';

function Join() {
  const [pin, setPin] = useState('');
  const [nick, changeNick] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const callback = (message) => {
    if (message.body) {
      const parsed = JSON.parse(message.body);
      if (parsed.type === messageType.START_GAME) {
        parsed.content === 'start' ? navigate(`/join/${pin}`) : setLoading(false);
        parsed.content === 'end' ? navigate(`/join`) : setLoading(false);
      } else {
        console.log('got empty message');
      }
    }
  };

  useEffect(() => {
    client.activate();
  }, []);

  function handleJoin(event) {
    event.preventDefault();
    auth.setNick(nick);
    if (client.connected) {
      client.subscribe(`/topic/public/${pin}`, callback);
      client.publish({
        destination: `/app/${pin}.newUser`,
        body: chatMessage(nick, '', messageType.CONNECT),
      });
      setLoading(true);
    }
  }
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Back to={'/'} />
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={(event) => handleJoin(event)} className="form">
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
          <button type="submit" className="button">
            Dołącz
          </button>
        </form>
      )}
    </div>
  );
}

export default Join;
