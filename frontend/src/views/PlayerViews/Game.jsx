import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GameView from '../../components/PhoneView/Game/GameView';
import { useCookies } from 'react-cookie';
import { TYPES, createMessage } from '../../services/SocketMessage';
import Loading from '../Loading';
import Error from '../Error';

function Game(props) {
  const { client, setTopics, setHandleMessage } = props;
  const [answers, setAnswers] = useState(['a', 'b', 'c', 'd']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { pin } = useParams();
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();

  const onMessageReceived = function (msg) {
    console.log(msg);
    switch (msg.type) {
      case TYPES.STARTED:
        setLoading(false);
        break;
      case TYPES.NEXT_ROUND:
        break;
      case TYPES.ENDED:
        break;
      default:
        break;
    }
  };
  const handleMessageSend = (msg) => {
    console.log(msg);
    client.current.sendMessage(
      `/app/game-room/${pin}`,
      createMessage(TYPES.PLAY, cookies.nick, msg)
    );
    if (!loading) {
      setLoading(true);
    }
  };

  useEffect(() => {
    setTopics([`/topic/game-room/${pin}`, `/user/topic/reply`]);
    setHandleMessage({ fn: onMessageReceived });
  }, [pin]);

  if (loading) {
    return <Loading message={'Waiting for host'} />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <>
      <GameView answers={answers} />
    </>
  );
}

export default Game;
