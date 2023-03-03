import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SockJsClientDefaults } from '../services/SockJsClientDefaults';

function ModePicker() {
  const navigate = useNavigate();
  function handleHost() {
    navigate('/host');
  }
  function handleJoin() {
    navigate('/join');
  }

  const [message, setMessage] = useState('You server message here.');
  const client = useRef(null);

  let onConnected = () => {
    console.log('Connected!!');
  };

  let onMessageReceived = (msg) => {
    console.log(msg);
    setMessage(msg.message);
  };

  const handleClick = () => {
    console.log('INPUT VALUE: ', client.current);
    // client.current.sendMessage('/app/message/1', JSON.stringify({ message: 'test' }));
    client.current.sendMessage(
      '/app/quizroom/123456',
      JSON.stringify({ message: 'test' })
    );
  };

  return (
    <div className="flex h-screen flex-row items-center justify-center p-10">
      <div className="card m-5" onClick={() => handleHost()}>
        <div className="text-5xl sm:text-8xl ">Host</div>
      </div>
      <div className="card m-5" onClick={() => handleJoin()}>
        <div className="text-5xl sm:text-8xl ">Gracz</div>
      </div>
      <SockJsClientDefaults
        topics={['/topic/message/1', `/topic/quizroom/123456`]}
        onConnect={onConnected}
        onDisconnect={() => console.log('Disconnected!')}
        onMessage={(msg) => onMessageReceived(msg)}
        ref={client}
      />
      <div>{message}</div>
      <button onClick={handleClick}>Send</button>
    </div>
  );
}

export default ModePicker;
