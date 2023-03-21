import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GameType from '../../components/PhoneView/GameType';
import Loading from '../Loading';
import { createMessage, TYPES } from '../../services/SocketMessage';
import { useCookies } from 'react-cookie';

function Quiz(props) {
  const { client, setTopics, setHandleMessage } = props;
  const [answers, setAnswers] = useState(['a', 'b', 'c', 'd']);
  const [gameType, setGameType] = useState('ABCD');
  const [loading, setLoading] = useState(true);
  const { pin } = useParams();
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();

  const onMessageReceived = function (msg) {
    console.log(msg);
    switch (msg.type) {
      // for now players get all data for first and next rounds
      case TYPES.STARTED:
        setLoading(false);
        setGameType(JSON.parse(msg.json).question.type);
        setAnswers(JSON.parse(msg.json).question.answers);
        break;
      // case TYPES.ANSWERS:
      //   /*
      //     message.json: {
      //     type: 'ABCD',
      //     answers: ['a', 'b', 'c', 'd'],
      //   }
      //   */
      //   setGameType(JSON.parse(msg.json).type);
      //   setAnswers(JSON.parse(msg.json).answers);
      //   setLoading(false);
      //   break;
      case TYPES.NEXT_ROUND:
        setGameType(JSON.parse(msg.json).question.type);
        setAnswers(JSON.parse(msg.json).question.answers);
        setLoading(false);
        break;

      case TYPES.ENDED:
        // TODO: Create separate route for players
        navigate(`/host/placeholderID/finalresults/${pin}`, {
          state: { players: JSON.parse(msg.json).players },
        });
        break;

      default:
        break;
    }
  };

  const handleMessageSend = (msg) => {
    console.log(msg);

    client.current.sendMessage(
      `/app/quizroom/${pin}`,
      createMessage(TYPES.PLAY, cookies.nick, msg)
    );

    if (!loading) {
      setLoading(true);
    }
  };

  useEffect(() => {
    setTopics([`/topic/quizroom/${pin}`, `/user/topic/reply`]);
    setHandleMessage({ fn: onMessageReceived });
  }, [pin]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <GameType type={gameType} answers={answers} handleClick={handleMessageSend} />
    </div>
  );
}

export default Quiz;
