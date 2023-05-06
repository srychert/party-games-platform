import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PointsChart from '../../components/PointsChart/PointsChart';
import { TYPES, createMessage } from '../../services/SocketMessage';
import Loading from '../Loading';

function MainQuiz(props) {
  const { client, setTopics, setHandleMessage } = props;
  const { id, pin } = useParams();
  const [loading, setLoading] = useState(true);
  const [round, setRound] = useState(0);
  const [question, setQuestion] = useState('');
  const [pointsScreen, setPointsScreen] = useState(false);
  const [players, setPlayers] = useState([]);

  const navigate = useNavigate();

  const handleNextRound = async () => {
    // TODO: show current score for five seconds
    // setPointsScreen(true);
    // await new Promise((r) => setTimeout(r, 5000));
    // setPointsScreen(false);

    // get next round data
    setRound(round + 1);
    client.current.sendMessage(
      `/app/quizroom/${pin}/host`,
      createMessage(TYPES.NEXT_ROUND, 'HOST')
    );
  };

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
        /* 
        message.json: {
            question: {
              type: 'ABCD',
              question: 'Pytanie',
              answers: ['a', 'b', 'c', 'd'],
            }
            players: [
              { id: "", nick: 'a', points: 1 }, 
              { id: "", nick: 'b', points: 2}],
          }
        */
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

  const handleStart = () => {
    client.current.sendMessage(
      `/app/quizroom/${pin}/host`,
      createMessage(TYPES.START_GAME, 'HOST')
    );
  };

  useEffect(() => {
    setTopics([`/topic/quizroom/${pin}/host`, `/user/topic/reply`]);
    setHandleMessage({ fn: handleMessage });
  }, [pin]);

  // loading -> ( gameScreen -> pointsScreen ) -> ... -> endScreen
  if (loading) {
    return (
      <>
        <div className="flex h-screen w-full items-center justify-center">
          <button className="button" onClick={handleStart}>
            Start
          </button>
        </div>
      </>
    );
  }

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
        <div className="p-5">
          <button className="button" onClick={handleNextRound}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default MainQuiz;
