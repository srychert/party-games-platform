import client from '../../services/SocketFactory/mySocketFactory';
import { chatMessage, messageType } from '../../services/SocketFactory/message';
import ABCD from './ABCD';
import TF from './TF';

function GameType({ type, answers, nick, pin }) {
  // Odpowiedź na pytanie
  const handleClick = (answer) => {
    if (client.connected) {
      client.publish({
        destination: `/app/${pin}`,
        body: chatMessage(nick, answer, messageType.MESSAGE),
      });
    }
  };

  return (
    <div>
      {type === 'ABCD' ? <ABCD answers={answers} handleClick={handleClick} /> : null}
      {type === 'TF' ? <TF answers={answers} handleClick={handleClick} /> : null}
    </div>
  );
}

export default GameType;
