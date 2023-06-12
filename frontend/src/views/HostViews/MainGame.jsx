import { createMessage } from '../../services/SocketMessage';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Loading';
import { TYPES } from '../../enums/MessageTypes';
import Error from '../Error';
import hostContext from '../../context/HostContext';
import MainGameView from '../../components/HostView/MainGameView';

function MainGame(props) {
  const { client, setTopics, setHandleMessage } = props;
  const { id, pin } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [players, setPlayers] = useState({});
  const [currentNodes, setCurrentNodes] = useState({});
  const [gameEnded, setGameEnded] = useState(false);

  const navigate = useNavigate();
  const handleLeave = () => {
    console.log('leave');
    client.current.sendMessage(
      `/app/game-room/${pin}/host`,
      createMessage(TYPES.END_GAME, 'Host')
    );
    navigate(`/host`);
  };

  const handleNextRound = () => {
    console.log('next round');
    client.current.sendMessage(
      `/app/game-room/${pin}/host`,
      createMessage(TYPES.NEXT_ROUND, 'Host')
    );
  };

  const handleMessage = (msg) => {
    console.log(msg);
    const msgJson = JSON.parse(msg.json);
    console.log(msgJson);
    switch (msg.type) {
      case TYPES.STARTED:
        setPlayers(msgJson.players);
        setLoading(false);
        break;
      case TYPES.ANSWER:
        setPlayers((prev) => ({ ...prev, [msgJson.player.id]: msgJson.player }));
        setCurrentNodes((prev) => ({
          ...prev,
          [msgJson.player.id]: msgJson?.node?.type,
        }));
        setLoading(false);
        break;
      case TYPES.NEXT_ROUND:
        break;
      case TYPES.ENDED:
        setGameEnded(true);
        break;
      case TYPES.ERROR:
        setError(msgJson.message);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    client.current.sendMessage(
      `/app/game-room/${pin}/host`,
      createMessage(TYPES.START_GAME, 'HOST')
    );
    setTopics([`/topic/game-room/${pin}/host`, `/topic/game-room/${pin}`]);
    setHandleMessage({ fn: handleMessage });
  }, [pin]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="h-full overflow-hidden">
      <hostContext.Provider
        value={{
          players: players,
          gameEnded: gameEnded,
          currentNodes: currentNodes,
        }}
      >
        <MainGameView handleLeave={handleLeave} handleNextRound={handleNextRound} />
      </hostContext.Provider>
    </div>
  );
}

export default MainGame;
