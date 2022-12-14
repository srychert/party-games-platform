/* eslint-disable */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../../services/SocketFactory/mySocketFactory';
import useGame from '../../hooks/useGame';
import { chatMessage, messageType } from '../../services/SocketFactory/message';
import Question from '../Question/Question';

import answerRecived from './answer';

function MainGame() {
  let { id, pin } = useParams();
  const gamedata = useGame(id);
  const [round, setRound] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [wyniki, setWyniki] = useState([]);
  console.log(gamedata);
  useEffect(() => {
    client.activate();
    client.onConnect = () => {
      client.subscribe(`/topic/public/${pin}`, callback);
      client.publish({
        destination: `/app/${pin}.send`,
        body: chatMessage(
          'host',
          makeContent(gamedata.questions[round].answers),
          messageType.ANSWERS
        ),
      });
    };
  }, []);

  useEffect(() => {
    // Wysyła wyniki
    if (client && round) {
      client.publish({
        destination: `/app/${pin}.send`,
        body: chatMessage('host', wynikiToContent(wyniki), messageType.RESULT),
      });
      client.publish({
        destination: `/app/${pin}.send`,
        body: chatMessage(
          'host',
          makeContent(gamedata.questions[round].answers),
          messageType.ANSWERS
        ),
      });
    }
  }, [wyniki, round]);

  function handleNextRund() {
    // Zlicza punkty
    countPoints();

    // Wysyła next round question
    setRound((prev) => prev + 1);
    setAnswers([]);
  }
  function makeContent(answers) {
    return '' + answers.map((answer) => answer.answer).join(';');
  }
  function wynikiToContent(wyniki) {
    return '' + wyniki.map((wynik) => wynik.nick + ',' + wynik.points).join(';');
  }
  function countPoints() {
    const goodAnswer = gamedata.questions[round].answers.filter(
      (answer) => answer.correct
    )[0];
    const goodAnswerIndex = gamedata.questions[round].answers.indexOf(goodAnswer);
    const points = answers.map((answer) => {
      if (answer.answer === goodAnswerIndex) {
        return { nick: answer.nick, points: 1 };
      } else {
        return { nick: answer.nick, points: 0 };
      }
    });
    const newWyniki = [...wyniki];
    points.forEach((point) => {
      const index = newWyniki.findIndex((wynik) => wynik.nick === point.nick);
      if (index !== -1) {
        newWyniki[index].points += point.points;
      } else {
        newWyniki.push(point);
      }
    });
    setWyniki(newWyniki);
  }
  // Game Logic
  function callback(message) {
    if (message.type === messageType.ANSWERS) {
      setAnswers((prev) => [...prev, answerRecived(message.sender, message.content)]);
    }
  }

  return (
    <div className="game-board">
      <Question question={gamedata.questions[round]} />
      <button className="button absolute top-5 right-5" onClick={handleNextRund}>
        Next
      </button>
    </div>
  );
}

export default MainGame;

/* gamedata :{
  questions: [
    {
      question: String,
      answers: [
        {
          answer: String,
          correct: Boolean,
        },
        {
          answer: String,
          correct: Boolean,
        },
        {
          answer: String,
          correct: Boolean,
        },
        {
          answer: String,
          correct: Boolean,
        }
      ],
    }
  ]
}

wyniki: {
  nick: String : wynik: Number,
  nick: String : wynik: Number,
}
*/
