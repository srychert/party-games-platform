import { createMessage } from '../../services/SocketMessage';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PointsChart from '../../components/PointsChart/PointsChart';
import Loading from '../Loading';
import { TYPES } from '../../enums/MessageTypes';

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

  const handleNextRound = () => {
    console.log('next round');
    client.current.sendMessage(
      `/app/game-room/${pin}/host`,
      createMessage(TYPES.NEXT_ROUND, 'Host')
    );
  };

  const handleMessage = (msg) => {
    const msgJson = JSON.parse(msg.json);
    console.log(msgJson);

    switch (msg.type) {
      case TYPES.STARTED:
        setPlayers(msgJson.players);
        setLoading(false);
        break;

      // TODO update host view with player info
      case TYPES.ANSWER:
        break;

      case TYPES.NEXT_ROUND:
        setRound(round + 1);
        break;

      case TYPES.ENDED:
        // nagivate to end game page
        navigate(`/host/game/final-results`, {
          state: {
            players: msgJson.players,
          },
        });
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

  return (
    <>
      <div className="flex justify-between">
        <div className="p-5">
          <button className="button" onClick={handleLeave}>
            Leave
          </button>
        </div>
        <div className="mx-5 flex flex-col items-center justify-center">
          <div>Started</div>
          <div>
            <iframe src="https://giphy.com/embed/QpWDP1YMziaQw" allowFullScreen></iframe>
          </div>
        </div>
        <div className="p-5">
          <button className="button" onClick={handleNextRound}>
            Next Round
          </button>
        </div>
      </div>
    </>
  );
}

export default MainGame;
