/* eslint-disable */
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import client from '../../services/SocketFactory/mySocketFactory';
import useGame from '../../hooks/useGame';
import { chatMessage, messageType } from '../../services/SocketFactory/message';
import Question from '../Question/Question';

import answerRecived from './answer';

function MainGame({ route, navigation }) {
  const { id, pin } = useParams();
  const location = useLocation();
  const gameData = useGame(id);
  const [round, setRound] = useState(0);
  const [players, setPlayers] = useState(
    location?.state?.players
      ? location.state.players.map((p) => ({ nick: p, points: 0, currentRound: 0 }))
      : []
  );

  useEffect(() => {
    client.activate();
    client.onConnect = () => {
      client.subscribe(`/topic/public/${pin}`, gameLogic);

      // this is really bad
      if (gameData?.questions) {
        /* prettier-ignore */
        const test = async () => await new Promise(r => setTimeout(() => {r()}, 10))
        test();

        client.publish({
          destination: `/app/${pin}`,
          body: chatMessage(
            'host',
            JSON.stringify(gameData.questions[round].answers),
            messageType.ANSWERS
          ),
        });
      }
    };
  }, [gameData]);

  function handleNextRound() {
    setRound(round + 1);
    // show results on screen here

    client.publish({
      destination: `/app/${pin}`,
      body: chatMessage(
        'host',
        JSON.stringify(gameData.questions[round].answers),
        messageType.ANSWERS
      ),
    });
  }

  // Game Logic
  const gameLogic = (message) => {
    if (!message?.body) {
      return;
    }

    const msg = JSON.parse(message?.body);
    // why is this always 0...
    console.log(round);

    // handling players responses to questions
    if (msg.type === messageType.MESSAGE) {
      const { content, sender } = msg;
      // this returns reference to object, should make this into copy of player
      const player = players.find((p) => p.nick === sender && p.currentRound === round);

      if (!player) {
        return;
      }

      const questions = gameData?.questions;

      // comparing strings here
      const correct = questions[round].correct == content;
      if (correct) {
        player.points += 1;
      }

      player.currentRound += 1;

      const newPlayers = players.map((p) => {
        if (p.nick === sender) {
          return player;
        }
        return p;
      });

      setPlayers(newPlayers);
    }
  };

  return (
    <div className="game-board">
      {/* testing players points */}
      <div>
        {players.map((p, index) => (
          <div key={'player-' + index}>
            {p.nick} {p.points}
          </div>
        ))}
      </div>

      {gameData?.questions &&
        gameData.questions.map((question, index) => {
          return (
            index === round && <Question question={question} key={'question-' + index} />
          );
        })}
      <button className="button absolute top-5 right-5" onClick={handleNextRound}>
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
