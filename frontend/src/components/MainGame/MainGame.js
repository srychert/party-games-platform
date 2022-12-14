/* eslint-disable */
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import client from '../../services/SocketFactory/mySocketFactory';
import useGame from '../../hooks/useGame';
import { chatMessage, messageType } from '../../services/SocketFactory/message';
import Question from '../Question/Question';

function MainGame({ route, navigation }) {
  const { id, pin } = useParams();
  const location = useLocation();
  const gameData = useGame(id);

  const [start, setStart] = useState(false);
  const [round, setRound] = useState(0);
  const [players, setPlayers] = useState(
    location?.state?.players
      ? location.state.players.map((p) => ({ nick: p, points: 0, currentRound: 0 }))
      : []
  );

  // init socket connection and subscribe to topic and after refresh
  useEffect(() => {
    if (client.connected) {
      client.subscribe(`/topic/public/${pin}`, gameLogic);
    } else {
      client.activate();
      client.onConnect = () => {
        client.subscribe(`/topic/public/${pin}`, gameLogic);
      };
    }
  }, [gameData, players, round]);

  // button Start handler for host
  function handleStart() {
    setStart(true);
  }

  // button Next handler for host
  function handleNextRound() {
    setRound(round + 1);
  }
  useEffect(() => {
    // sending results to players
    if (client.connected) {
      client.publish({
        destination: `/app/${pin}`,
        body: chatMessage('host', JSON.stringify(players), messageType.RESULT),
      });
    }
    // only when round changes
  }, [round]);

  useEffect(() => {
    if (client.connected) {
      client.publish({
        destination: `/app/${pin}`,
        body: chatMessage(
          'host',
          JSON.stringify(gameData.questions[round].answers),
          messageType.ANSWERS
        ),
      });
    }
  }, [round, start]);

  // Game Logic must be in useEffect because it's async........ !!!!!!!!!!!!!!
  const gameLogic = (message) => {
    // message has type, sender, content
    if (!message?.body) {
      return;
    }
    const msg = JSON.parse(message?.body);

    // handling players responses to questions
    if (msg.type === messageType.MESSAGE) {
      const { content, sender } = msg;
      // this returns reference to object, should make this into copy of player
      // round depends removed !!!
      const player = players.find((p) => p.nick === sender);

      if (!player) {
        console.log('player not found');
        const x = players.find((p) => p.nick === sender);
        console.log(x);

        return;
      }

      const questions = gameData?.questions;

      if (!questions) {
        console.log('no questions');
        return;
      }
      // comparing strings here
      // here is where the bug is
      // OMG INDEX IS COUNTING FROM 0
      const correct = questions[round].correct - 1 == content;
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
      {/* {      <div>
        {players.map((p, index) => (
          <div key={'player-' + index}>
            {p.nick} {p.points}
          </div>
        ))}
      </div>} */}
      {!start && (
        <div className="">
          <h1>Round {round + 1}</h1>
          <button onClick={handleStart} className="button">
            Start
          </button>
        </div>
      )}
      {gameData?.questions &&
        start &&
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
