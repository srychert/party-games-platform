import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Question from '../../components/Question/Question';
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
    // show current score for five seconds
    setPointsScreen(true);
    await new Promise((r) => setTimeout(r, 5000));
    setPointsScreen(false);

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
        // game over
        console.log('game over');
        //nagivate to end game page
        navigate(`/host/${id}/finalresults/${pin}`, {
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
        <div>
          <button className="button absolute inset-1/2" onClick={handleStart}>
            Start
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <button className="button absolute top-5 left-5" onClick={handleLeave}>
        Leave
      </button>

      <div className="game-board">
        <h1>Round {round + 1}</h1>
        {/* fix pointschart */}
        {/* {pointsScreen && <PointsChart players={players} />} */}
        {!pointsScreen && <Question question={question} key={'question'} />}
      </div>
      <button className="button absolute top-5 right-5" onClick={handleNextRound}>
        Next
      </button>
    </>
  );
}

export default MainQuiz;
