import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Question from '../../components/Question/Question';
import { ParseSocketMessage } from '../../services/Quiz/ParseSocketMessage';
import { TYPES } from '../../services/SocketMessage';

function MainQuiz(props) {
  const { client, setTopics, setHandleMessage } = props;
  const { id, pin } = useParams();
  const [round, setRound] = useState(0);
  const [question, setQuestion] = useState('');
  const [players, setPlayers] = useState([]);

  const handleNextRound = () => {
    // setRound(round + 1);
    // client.current.sendMessage(`/app/quizroom/${pin}/host`, 'Host', 'Next');
    console.log('next round');
  };

  const handleMessage = (msg) => {
    console.log(msg);
    switch (msg.type) {
      case TYPES.STARTED:
        setPlayers(JSON.parse(msg.json));
        break;

      default:
        break;
    }

    // const { question, points } = ParseSocketMessage(msg, 'Host');
    // console.log(question, points);
    // setPlayers(points);
    // setQuestion(question);
  };

  useEffect(() => {
    setTopics([`/topic/quizroom/${pin}/host`, `/user/topic/reply`]);
    setHandleMessage({ fn: handleMessage });
  }, [pin]);

  return (
    <>
      <button
        className="button absolute top-5 left-5"
        onClick={() => {
          console.log('leave');
        }}
      >
        Leave
      </button>

      <div className="game-board">
        <h1>Round {round + 1}</h1>
        <Question question={question} key={'question'} />

        <button className="button absolute top-5 right-5" onClick={handleNextRound}>
          Next
        </button>
      </div>
    </>
  );
}

export default MainQuiz;
