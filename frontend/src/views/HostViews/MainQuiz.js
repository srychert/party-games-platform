import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Question from '../../components/Question/Question';
import PointsChart from '../../components/PointsChart/PointsChart';
import { TYPES, createMessage } from '../../services/SocketMessage';

function MainQuiz(props) {
  const { client, setTopics, setHandleMessage } = props;
  const { id, pin } = useParams();
  const [round, setRound] = useState(0);
  const [question, setQuestion] = useState('');
  const [pointsScreen, setPointsScreen] = useState(false);
  const [players, setPlayers] = useState([]);

  const navigate = useNavigate();

  const handleNextRound = () => {
    setRound(round + 1);
    client.current.sendMessage(
      `/app/quizroom/${pin}/host`,
      createMessage('Host', TYPES.NEXT_ROUND)
    );
    setPointsScreen(true);
  };

  const handleLeave = () => {
    console.log('leave');
    // client.current.sendMessage(
    //   `/app/quizroom/${pin}/host`,
    //   createMessage('Host', TYPES.END_GAME)
    // );
    navigate(`/host`);
  };

  // change screen to points and back to question
  useEffect(() => {
    async function changeScreen() {
      console.log('pointsScreen');
      await new Promise((r) => setTimeout(r, 5000));
      setPointsScreen(false);
      console.log('questionScreen');
    }
    changeScreen();
  }, [round]);

  const handleMessage = (msg) => {
    console.log(msg);
    switch (msg.type) {
      case TYPES.STARTED:
        // init players state
        setPlayers(JSON.parse(msg.json));
        break;

      case TYPES.NEXT_ROUND:
        // set questions per round
        // and points per round
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
        setQuestion(JSON.parse(msg.json).question);
        setPlayers(JSON.parse(msg.json).players);

        break;

      case TYPES.END_GAME:
        // game over
        console.log('game over');
        setPlayers(JSON.parse(msg.json));
        //nagivate to end game page
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    setTopics([`/topic/quizroom/${pin}/host`, `/user/topic/reply`]);
    setHandleMessage({ fn: handleMessage });
  }, [pin]);
  // loding -> ( gameScreen -> pointsScreen ) -> ... -> endScreen

  return (
    <>
      <button className="button absolute top-5 left-5" onClick={handleLeave}>
        Leave
      </button>

      <div className="game-board">
        <h1>Round {round + 1}</h1>
        {pointsScreen && <PointsChart players={players} />}
        {!pointsScreen && <Question question={question} key={'question'} />}
      </div>
      <button className="button absolute top-5 right-5" onClick={handleNextRound}>
        Next
      </button>
    </>
  );
}

export default MainQuiz;
