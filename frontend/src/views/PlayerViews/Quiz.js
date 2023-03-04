import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GameType from '../../components/PhoneView/GameType';
import Loading from '../Loading';
import { ParseSocketMessage } from '../../services/Quiz/ParseSocketMessage';
import { TYPES } from '../../services/SocketMessage';

function Quiz(props) {
  const { client, setTopics, setHandleMessage } = props;
  const [answers, setAnswers] = useState(['a', 'b', 'c', 'd']);
  const [gameType, setGameType] = useState('ABCD');
  const [loading, setLoading] = useState(true);
  const { pin } = useParams();

  const onMessageReceived = function (msg) {
    console.log(msg);
    switch (msg.type) {
      case TYPES.STARTED:
        setLoading(false);
        break;

      default:
        break;
    }
    // const { gameType, answers } = ParseSocketMessage(message, 'PLAYER');
    // console.log(gameType, answers);
    // setAnswers(answers);
    // setGameType(gameType);
  };

  const handleMessageSend = (msg) => {
    console.log(msg);

    // client.current.sendMessage(`/topic/quizroom/${pin}`, message);
  };

  useEffect(() => {
    setTopics([`/topic/quizroom/${pin}`, `/user/topic/reply`]);
    setHandleMessage({ fn: onMessageReceived });
  }, [pin]);
  return (
    <>
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
