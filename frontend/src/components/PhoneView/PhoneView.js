/* eslint-disable */

import { useEffect, useState } from 'react';
import client from '../../services/SocketFactory/mySocketFactory';
import { messageType, chatMessage } from '../../services/SocketFactory/message';
import { useAuth } from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import PointsChart from '../PointsChart/PointsChart';

function PhoneView() {
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [wyniki, setWyniki] = useState([{}, {}, {}, {}]);
  const auth = useAuth();
  const nick = auth.cookies.nick;
  const { pin } = useParams();

  // wsClient init i jego logika
  const callback = function (message) {
    console.log(message.body);
    if (message.body) {
      const parsed = JSON.parse(message.body);
      if (parsed.type === messageType.ANSWERS) {
        setAnswers(JSON.parse(parsed.content));
      }
    } else {
      console.log('Empty message');
    }
  };

  useEffect(() => {
    client.activate();
    client.onConnect = () => {
      client.subscribe(`/topic/public/${pin}`, callback);
    };
  }, [pin]);

  // Odpowiedź na pytanie
  const handleClick = (answer) => {
    // Answer 1-4
    if (client) {
      client.publish({
        destination: `/app/${pin}`,
        body: chatMessage(nick, answer, messageType.MESSAGE),
      });
    }
  };

  return (
    <div>
      <div className="h-screen">
        <div className="flex h-1/5 items-end justify-center">
          <PointsChart players={wyniki} />
        </div>
        {answers && (
          <div className="grid h-4/5 grid-cols-2 grid-rows-2 gap-2 overflow-hidden">
            <button className={`box bg-blue-700`} id="1" onClick={() => handleClick(0)}>
              {answers[0]}
            </button>
            <button
              className={`box bg-pastel-green-700`}
              id="2"
              onClick={() => handleClick(1)}
            >
              {answers[1]}
            </button>
            <button
              className={`box bg-sahara-sand-700`}
              id="3"
              onClick={() => handleClick(2)}
            >
              {answers[2]}
            </button>
            <button className={`box bg-froly-700`} id="4" onClick={() => handleClick(3)}>
              {answers[3]}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PhoneView;

/*
  {
    nick: 'test',
    points: 0,
  },
  {
    nick: '123',
    points: 5,
  },
  {
    nick: 'test2',
    points: 7,
  },

*/
