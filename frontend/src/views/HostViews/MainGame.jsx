import { TYPES, createMessage } from '../../services/SocketMessage';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PointsChart from '../../components/PointsChart/PointsChart';

function MainGame(props) {
  const { client, setTopics, setHandleMessage } = props;
  const { id, pin } = useParams();
  const [loading, setLoading] = useState(true);
  const [round, setRound] = useState(0);
  const [question, setQuestion] = useState('');
  const [pointsScreen, setPointsScreen] = useState(false);
  const [players, setPlayers] = useState([]);

  const navigate = useNavigate();
  const handleLeave = () => {
    console.log('leave');
    // END_GAME is not being handled by backend
    // but navigation to host should end the connection and end the game
    client.current.sendMessage(
      `/app/quizroom/${pin}/host`,
      createMessage(TYPES.END_GAME, 'Host')
    );
    navigate(`/host`);
  };
  const handleMessage = (msg) => {
    console.log(msg);
    console.log(JSON.parse(msg.json));

    function setPlayersAndQuestionFromMessage(msg) {
      const { players, question } = JSON.parse(msg.json);
      setPlayers(players);
      setQuestion(question.question);
      return { players, question };
    }

    switch (msg.type) {
      case TYPES.STARTED:
        setPlayersAndQuestionFromMessage(msg);
        setLoading(false);
        break;

      case TYPES.NEXT_ROUND:
        setPlayersAndQuestionFromMessage(msg);
        setRound(round + 1);
        break;

      case TYPES.ENDED:
        // nagivate to end game page
        navigate(`/final-results`, {
          state: { players: JSON.parse(msg.json).players },
        });
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    client.current.sendMessage(
      `/app/quizroom/${pin}/host`,
      createMessage(TYPES.START_GAME, 'HOST')
    );
    setTopics([`/topic/quizroom/${pin}/host`, `/user/topic/reply`]);
    setHandleMessage({ fn: handleMessage });
  }, [pin]);

  return (
    <>
      <div className="flex">
        <div className="p-5">
          <button className="button" onClick={handleLeave}>
            Leave
          </button>
        </div>
        <div className="mx-5 flex flex-col items-center justify-center">
          <h1>Round {round + 1}</h1>
          {pointsScreen && <PointsChart players={players} />}
          {!pointsScreen && <span className="text-8xl">{question}</span>}
        </div>
      </div>
    </>
  );
}

export default MainGame;

// TODO
