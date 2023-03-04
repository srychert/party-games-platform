import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import GameType from '../../components/PhoneView/GameType';
import Loading from '../Loading';
import { SockJsClientDefaults } from '../../services/SockJsClientDefaults';
import { ParseSocketMessage } from '../../services/Quiz/ParseSocketMessage';

function Quiz() {
  const [answers, setAnswers] = useState(['a', 'b', 'c', 'd']);
  const [gameType, setGameType] = useState('ABCD');
  const [loading, setLoading] = useState(false);
  const { pin } = useParams();

  const client = useRef(null);

  const onMessageReceived = function (message) {
    console.log(message);
    const { gameType, answers } = ParseSocketMessage(message, 'PLAYER');
    setAnswers(answers);
    setGameType(gameType);
  };

  const handleMessageSend = (message) => {
    console.log(message);
    client.current.sendMessage(`/app/public/${pin}`, message);
  };
  return (
    <>
      <SockJsClientDefaults
        topics={[`/topic/public/${pin}`]}
        onConnect={() => console.log('Connected!')}
        onDisconnect={() => console.log('Disconnected!')}
        onMessage={onMessageReceived}
        ref={client}
      />

      {loading && <Loading />}

      {!loading && (
        <div>
          <GameType type={gameType} answers={answers} handleClick={handleMessageSend} />
        </div>
      )}
    </>
  );
}

export default Quiz;
