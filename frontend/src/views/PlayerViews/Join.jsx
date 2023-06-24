import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMessage } from '../../services/SocketMessage';
import { useCookies } from 'react-cookie';
import { TYPES } from '../../enums/MessageTypes';

function Join(props) {
  const { client, setTopics, setHandleMessage } = props;
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [nick, changeNick] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies();
  const [gameType, setGameType] = useState('game');
  const navigate = useNavigate();

  const handleJoin = (event) => {
    event.preventDefault();
    //REFACTORABLE
    if (gameType === 'game') {
      client.current.sendMessage(
        `/app/game-room/${pin}`,
        createMessage(TYPES.JOIN, nick)
      );
    } else {
      client.current.sendMessage(`/app/quizroom/${pin}`, createMessage(TYPES.JOIN, nick));
    }
  };

  const handleMessage = (msg) => {
    switch (msg.type) {
      case TYPES.JOINED:
        setCookie('player_id', msg.content, { path: '/' });
        setCookie('nick', msg.sender, { path: '/' });
        //REFACTORABLE
        if (gameType === 'game') {
          navigate(`/player/game/${pin}`, {
            state: {
              player: JSON.parse(msg.json).player,
              node: JSON.parse(msg.json).node,
            },
          });
        } else {
          navigate(`/player/quiz/${pin}`);
        }
        break;
      case TYPES.DUPLICATE_NICK:
        setError('Duplicate nick');
        break;
      case TYPES.NO_ROOM:
        setError('No room with this pin');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (gameType === 'game') {
      setTopics([`/topic/game-room/${pin}`, `/user/topic/reply`]);
    } else {
      setTopics([`/topic/quizroom/${pin}`, `/user/topic/reply`]);
    }
    setHandleMessage({ fn: handleMessage });
  }, [pin, gameType]);

  return (
    <div className="grid h-full place-content-center">
      <form onSubmit={handleJoin} className="form">
        <div className="form-row">
          <div className="form-input-container">
            <label htmlFor="pin">Pin</label>
            <input
              className="form-input"
              type="text"
              name="pin"
              id="pin"
              autoComplete="off"
              onChange={(e) => setPin(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-input-container">
            <label htmlFor="nick">Nick</label>
            <input
              className="form-input"
              type="text"
              name="nick"
              id="nick"
              autoComplete="off"
              onChange={(e) => changeNick(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-input-container">
            <label htmlFor="gameType">Game type</label>
            <select
              className="form-input"
              name="gameType"
              id="gameType"
              onChange={(e) => setGameType(e.target.value)}
            >
              <option value="game">Game</option>
              <option value="quiz">Quiz</option>
            </select>
          </div>
        </div>

        <div className="text-red-500">{error}</div>
        <button type="submit" className="button">
          Join
        </button>
      </form>
    </div>
  );
}

export default Join;
