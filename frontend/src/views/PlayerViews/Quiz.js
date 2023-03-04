import { useRef, useState } from 'react';
import { messageType } from '../../services/SocketFactory/message';
import { useParams } from 'react-router-dom';
import PointsChart from '../../components/PointsChart/PointsChart';
import GameType from '../../components/PhoneView/GameType';
import Loading from '../Loading';
import { SockJsClientDefaults } from '../../services/SockJsClientDefaults';
import { useCookies } from 'react-cookie';

function Quiz() {
  const [answers, setAnswers] = useState([]);
  const [gameType, setGameType] = useState('ABCD');
  const [wyniki, setWyniki] = useState([{}, {}, {}, {}]);
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const { pin } = useParams();

  const client = useRef(null);

  const onMessageReceived = function (message) {
    console.log(message);
    if (message.type === messageType.START_GAME) {
      setLoading(false);
    }
    if (message.type === messageType.ANSWERS) {
      const msgParsed = JSON.parse(message.content);
      setAnswers(msgParsed.answers);
      setGameType(msgParsed.type);
    }
    if (message.type === messageType.RESULTS) {
      // Pewnie trzeba message.content przekształcić na odpowiednią strukturę
      setWyniki(message.content);
    }
  };

  const handleMessageSend = (message) => {
    client.current.sendMessage(`/app/public/${pin}`, message);
  };

  return (
    <>
      <SockJsClientDefaults
        topics={[`/topic/public/${pin}`]}
        onConnect={() => console.log('Connected!')}
        onDisconnect={() => console.log('Disconnected!')}
        onMessage={onMessageReceived}
        ref={client}
      />

      {loading && <Loading />}

      {!loading && (
        <div>{GameType(gameType, answers, cookies.nick, pin, handleMessageSend)}</div>
      )}
    </>
  );
}

export default Quiz;
