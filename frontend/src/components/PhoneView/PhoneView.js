/* eslint-disable */

import { useEffect, useState } from 'react';
import client from '../../services/SocketFactory/mySocketFactory';
import { messageType, chatMessage } from '../../services/SocketFactory/message';
import { useAuth } from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import PointsChart from '../PointsChart/PointsChart';
import GameType from './GameType';
import Loading from '../Loading/Loading';

function PhoneView() {
  const [answers, setAnswers] = useState({ type: '', answers: [] });
  const [wyniki, setWyniki] = useState([{}, {}, {}, {}]);
  const [clicked, setClicked] = useState(false);
  const auth = useAuth();
  const nick = auth.cookies.nick;
  const { pin } = useParams();

  useEffect(() => {
    if (client.connected) {
      client.subscribe(`/topic/public/${pin}`, callback);
    } else {
      client.activate();
      client.onConnect = () => {
        client.subscribe(`/topic/public/${pin}`, callback);
      };
    }
  }, [pin, nick, answers, wyniki]);

  const callback = function (message) {
    if (message.body) {
      const parsed = JSON.parse(message.body);
      if (parsed.type === messageType.ANSWERS) {
        setAnswers(JSON.parse(parsed.content));
        setClicked(false);
      }
      if (parsed.type === messageType.RESULT) {
        setWyniki(JSON.parse(parsed.content));
      }
    } else {
      console.log('Empty message');
    }
  };

  if (clicked) {
    return (
      <div>
        <Loading />
      </div>
    );
  } else {
    return (
      <div>
        <div className="flex h-screen flex-col">
          <PointsChart players={wyniki} />
          <GameType
            type={answers.type}
            answers={answers.answers}
            nick={nick}
            pin={pin}
            setClickedUP={setClicked}
          />
        </div>
      </div>
    );
  }
}

export default PhoneView;
