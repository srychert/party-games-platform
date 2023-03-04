import { useRef, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useGame } from '../../hooks/useGame';
import { chatMessage, messageType } from '../../services/SocketFactory/message';
import Question from '../../components/Question/Question';
import Loading from '../Loading';
import { SockJsClientDefaults } from '../../services/SockJsClientDefaults';
import { ParseSocketMessage } from '../../services/Quiz/ParseSocketMessage';

function MainQuiz() {
  const { id, pin } = useParams();
  const location = useLocation();
  const [start, setStart] = useState(false);
  const [round, setRound] = useState(0);
  const [question, setQuestion] = useState('');
  const [players, setPlayers] = useState(
    location?.state?.players
      ? location.state.players.map((p) => ({
          id: p.id,
          nick: p.nick,
          points: 0,
          currentRound: 0,
        }))
      : []
  );

  const client = useRef(null);
  // useGame(id, round)
  const { isLoading, isError, data: gameData, error } = useGame(id);

  // // init socket connection and subscribe to topic and after refresh
  // useEffect(() => {
  //   if (client.connected) {
  //     client.subscribe(`/topic/public/${pin}`, gameLogic);
  //   } else {
  //     client.activate();
  //     client.onConnect = () => {
  //       client.subscribe(`/topic/public/${pin}`, gameLogic);
  //     };
  //   }
  // }, [gameData, players, round]);

  // // only when round changes check if game is over
  // useEffect(() => {
  //   // sending results to players
  //   if (client.connected) {
  //     client.publish({
  //       destination: `/app/${pin}`,
  //       body: chatMessage('host', JSON.stringify(players), messageType.RESULT),
  //     });
  //     // end of game
  //     if (round === gameData.questions.length) {
  //       console.log('end of game');
  //       client.publish({
  //         destination: `/app/${pin}`,
  //         body: chatMessage('host', 'end', messageType.START_GAME),
  //       });
  //       console.log('end of game');
  //       navigate(`/host/finalresults/${pin}`, { state: { players } });
  //     }
  //   }
  // }, [round, players]);

  // // game start and round change
  // useEffect(() => {
  //   // send possible answers to players
  //   if (client.connected && round !== gameData.questions.length) {
  //     // Type of game - ABCD
  //     if (gameData.questions[round].type === 'ABCD') {
  //       console.log('ABCD');
  //       client.publish({
  //         destination: `/app/${pin}`,
  //         body: chatMessage(
  //           'host',
  //           JSON.stringify({ type: 'ABCD', answers: gameData.questions[round].answers }),
  //           messageType.ANSWERS
  //         ),
  //       });
  //     }
  //     // Type of game - true/false
  //     // TODO: change to true/false in backend  and answers
  //     if (gameData.questions[round].type === 'TF') {
  //       client.publish({
  //         destination: `/app/${pin}`,
  //         body: chatMessage(
  //           'host',
  //           JSON.stringify({
  //             type: 'TF',
  //             answers: gameData.questions[round].answers,
  //           }),
  //           messageType.ANSWERS
  //         ),
  //       });
  //     }
  //   }
  // }, [round, start, client]);

  // const gameLogic = (message) => {
  //   // message has type, sender, content
  //   if (!message?.body) {
  //     return;
  //   }
  //   const msg = JSON.parse(message?.body);

  //   // handling players responses to questions
  //   if (msg.type === messageType.MESSAGE) {
  //     const { content, sender } = msg;

  //     // find player in players array and update his state
  //     const player = players.find((p) => p.nick === sender && p.currentRound === round);

  //     if (!player) {
  //       console.log('player not found');
  //       console.log('probably rounds are not in sync');
  //       const x = players.find((p) => p.nick === sender && p.currentRound === round);
  //       console.log(x);
  //       return;
  //     }

  //     const questions = gameData?.questions;

  //     if (!questions) {
  //       console.log('no questions');
  //       return;
  //     }
  //     // correct answer is string not number
  //     const correct = questions[round].correct == content;
  //     if (correct) {
  //       console.log('correct');
  //       player.points += 1;
  //     }

  //     player.currentRound += 1;

  //     const newPlayers = players.map((p) => {
  //       if (p.nick === sender) {
  //         return player;
  //       }
  //       return p;
  //     });

  //     setPlayers(newPlayers);
  //   }
  // };

  // button Start handler for host
  // function handleStart() {
  //   setStart(true);
  // }

  // function handleLeave() {
  //   if (client.connected) {
  //     client.publish({
  //       destination: `/app/${pin}`,
  //       body: chatMessage('host', 'end', messageType.START_GAME),
  //     });
  //   }
  //   navigate(`/host`);
  // }

  // // button Next handler for host
  // function handleNextRound() {
  //   setRound(round + 1);
  // }

  const handleStart = () => {
    setStart(true);
    client.current.sendMessage(`/app/${pin}`, 'Host', 'Start');
  };

  const handleNextRound = () => {
    setRound(round + 1);
  };

  const handleMessageReceived = (msg) => {
    console.log(msg);
    const { question, points } = ParseSocketMessage(msg, 'Host');
    setPlayers(points);
    setQuestion(question);
  };

  return (
    <>
      <SockJsClientDefaults
        topic={`/topic/public/${pin}`}
        onMessage={handleMessageReceived}
        ref={client}
      />
      {isLoading && <Loading />}
      {isError && <span>Error: {error.message}</span>}
      {!isLoading && !isError && (
        <div className="game-board">
          <div className="">
            <h1>Round {round + 1}</h1>
            <button onClick={handleStart} className="button">
              Start
            </button>
          </div>
          <Question question={question} key={'question'} />

          <button className="button absolute top-5 right-5" onClick={handleNextRound}>
            Next
          </button>
          <button
            className="button absolute top-5 left-5"
            onClick={() => {
              console.log('leave');
            }}
          >
            Leave
          </button>
        </div>
      )}
    </>
  );
}

export default MainQuiz;
