import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import client from '../../services/SocketFactory/mySocketFactory';
import { messageType, chatMessage } from '../../services/SocketFactory/message';
import Loading from '../Loading';
import Back from '../../components/Back/Back';
import { SockJsClientDefaults } from '../../services/SockJsClientDefaults';
import { createMessage, TYPES } from '../../services/SocketMessage';

function Join() {
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState('');
  const [nick, changeNick] = useState('');
  const navigate = useNavigate();

  const client = useRef(null);

  const handleJoin = (event) => {
    event.preventDefault();
    client.current.sendMessage(`/app/quizroom/${pin}`, createMessage(TYPES.JOIN, nick));
  };

  const handleMessage = (msg) => {
    console.log(msg);
  };

  return (
    <>
      <SockJsClientDefaults
        topics={[`/topic/quizroom/${pin}`]}
        onMessage={handleMessage}
        ref={client}
      />

      {loading && <Loading />}

      {!loading && (
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
            <button type="submit" className="button">
              Dołącz
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Join;
