import { TYPES, createMessage } from '../../services/SocketMessage';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PointsChart from '../../components/PointsChart/PointsChart';
import Loading from '../Loading';

function MainGame(props) {
  const { client, setTopics, setHandleMessage } = props;
  const { id, pin } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [round, setRound] = useState(0);
  const [players, setPlayers] = useState([]);

  const navigate = useNavigate();
  const handleLeave = () => {
    console.log('leave');
    client.current.sendMessage(
      `/app/game-room/${pin}/host`,
      createMessage(TYPES.END_GAME, 'Host')
    );
    navigate(`/host`);
  };
  const handleMessage = (msg) => {
    console.log(msg);
    console.log(JSON.parse(msg.json));

    function setPlayersAndOptionsFromMessage(msg) {
      const { players, options } = JSON.parse(msg.json);
      setPlayers(players);
      return { players, options };
    }

    switch (msg.type) {
      case TYPES.STARTED:
        setPlayersAndOptionsFromMessage(msg);
        setLoading(false);
        break;

      case TYPES.NEXT_ROUND:
        setPlayersAndOptionsFromMessage(msg);
        setRound(round + 1);
        break;

      case TYPES.ENDED:
        // nagivate to end game page
        navigate(`/final-results`, {
          state: { players: JSON.parse(msg.json).players },
        });
        break;

      case TYPES.ERROR:
        setError(JSON.parse(msg.json).message);
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
    setTopics([`/topic/game-room/${pin}/host`, `/user/topic/reply`]);
    setHandleMessage({ fn: handleMessage });
  }, [pin]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex">
        <div className="p-5">
          <button className="button" onClick={handleLeave}>
            Leave
          </button>
        </div>
        <div className="mx-5 flex flex-col items-center justify-center">STARTED</div>
      </div>
    </>
  );
}

export default MainGame;

// TODO
