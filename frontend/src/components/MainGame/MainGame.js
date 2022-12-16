/* eslint-disable */
import { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import client from '../../services/SocketFactory/mySocketFactory';
import useGame from '../../hooks/useGame';
import { chatMessage, messageType } from '../../services/SocketFactory/message';
import Question from '../Question/Question';

function MainGame({ route, navigation }) {
  const { id, pin } = useParams();
  const location = useLocation();
  const gameData = useGame(id);

  const navigate = useNavigate();

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

  // only when round changes
  useEffect(() => {
    // sending results to players
    if (client.connected) {
      client.publish({
        destination: `/app/${pin}`,
        body: chatMessage('host', JSON.stringify(players), messageType.RESULT),
      });
      // end of game
      if (round === gameData.questions.length) {
        client.publish({
          destination: `/app/${pin}`,
          body: chatMessage('host', 'end', messageType.START_GAME),
        });
        console.log('end of game');
        navigate(`/host/${id}/${pin}/end`, { state: { players } });
      }
    }
  }, [round]);

  useEffect(() => {
    // send possible answers to players
    if (client.connected) {
      // Type of game - ABCD
      if (gameData.questions[round].type === 'ABCD') {
        console.log('ABCD');
        client.publish({
          destination: `/app/${pin}`,
          body: chatMessage(
            'host',
            JSON.stringify({ type: 'ABCD', answers: gameData.questions[round].answers }),
            messageType.ANSWERS
          ),
        });
      }
      // Type of game - true/false
      // TODO: change to true/false in backend  and answers
      if (gameData.questions[round].type === 'true/false') {
        client.publish({
          destination: `/app/${pin}`,
          body: chatMessage(
            'host',
            JSON.stringify({
              type: 'true/false',
              answers: gameData.questions[round].answers,
            }),
            messageType.ANSWERS
          ),
        });
      }
    }
  }, [round, start, gameData, client]);

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
        const x = players.find((p) => p.nick === sender && p.currentRound === round);
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
      // points are added badly idk why
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

  // button Start handler for host
  function handleStart() {
    setStart(true);
  }

  function handleLeave() {
    if (client.connected) {
      client.publish({
        destination: `/app/${pin}`,
        body: chatMessage('host', 'end', messageType.START_GAME),
      });
    }
    navigate(`/host/${id}/${pin}/end`);
  }

  // button Next handler for host
  function handleNextRound() {
    setRound(round + 1);
  }

  return (
    <div className="game-board">
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
      <button className="button absolute top-5 left-5" onClick={handleLeave}>
        Leave
      </button>
    </div>
  );
}

export default MainGame;
