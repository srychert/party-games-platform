/* eslint-disable */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../../services/SocketFactory/mySocketFactory';
import useGame from '../../hooks/useGame';
import { chatMessage, messageType } from '../../services/SocketFactory/message';
import Question from '../Question/Question';

function MainGame() {
  let params = useParams();
  // const gamedata = useGame(params.id);
  const [round, setRound] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [wyniki, setWyniki] = useState([{}, {}, {}, {}]);
  const gamedata = {
    questions: [
      {
        question: 'Jak sie masz?',
        answers: [
          {
            answer: 'Dobrze',
            correct: true,
          },
          {
            answer: 'Średnio',
            correct: false,
          },
          {
            answer: 'Źle',
            correct: false,
          },
          {
            answer: 'Żałosnie',
            correct: false,
          },
        ],
      },
    ],
  };
  function calculatePoints() {
    const correctAnswer = gamedata.questions[round].answers.filter(
      (answer) => answer.correct
    );
    const index = gamedata.questions[round].answers.indexOf(correctAnswer[0]);
    /* 
      {
        answer: 'Dobrze',
        correct: true,
      }
      index => index dobrej odpowiedzi
      answers => tablica z odpowiedziami i nickami nick,odpowiedz
      points => tablica z punktami nick,punkty
    */

    const points = answers.map((answer) => {
      if (answer.split(',')[1] === index) {
        setWyniki((prev) => {
          const newWyniki = [...prev];
          newWyniki[answer.split(',')[0]].points += 1;
          return newWyniki;
        });
      } else {
        return 0;
      }
    });
  }

  function handleNextRund() {
    // Policz punkty
    // Wyślij wyniki do ziomków

    setRound((prev) => prev + 1);
    setAnswers([]);
  }

  function makeContent(answers) {
    return '' + answers.map((answer) => answer.answer).join(';');
  }

  function callback(message) {
    if (message.body) {
      const parsed = JSON.parse(message.body);
      if (parsed.type === messageType.CHAT) {
        setAnswers((prev) => [...prev, parsed.content.split(',')]);
      }
    } else {
      console.log('got empty message');
    }
  }
  useEffect(() => {
    client.activate();
    client.onConnect = () => {
      client.subscribe(`/topic/public/${params.pin}`, callback);
      client.publish({
        destination: `/app/chat/${params.pin}.send`,
        body: chatMessage(
          'host',
          makeContent(gamedata.questions[round].answers),
          messageType.CHAT
        ),
      });
    };
  }, [params.pin, round]);

  return (
    <div className="game-board">
      <Question question={gamedata.questions[round]} />
      <button className="button" onClick={handleNextRund}>
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
