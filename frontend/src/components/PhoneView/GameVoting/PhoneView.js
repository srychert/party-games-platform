import React, { useEffect, useState } from 'react';
import client from '../../../services/SocketFactory/mySocketFactory';
import { messageType, chatMessage } from '../../../services/SocketFactory/message';
import Loding from '../Loding/Loding';
import { useAuth } from '../../../hooks/useAuth';
import PointsChart from './PointsChart/PointsChart';
import { useParams } from 'react-router-dom';

function PhoneView() {
  const [gameState, setGameState] = useState('playing');
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [wyniki, setWyniki] = useState([
    {
      nick: 'test',
      points: 0
    },
    {
      nick: '123',
      points: 5
    },
    {
      nick: 'test2',
      points: 7
    }
  ]);
  const auth = useAuth();
  const nick = auth.cookies.nick;
  const { pin } = useParams();
  console.log(pin);

  // alert user kiedy wyjdzie z gry
  useEffect(() => {
    window.addEventListener('beforeunload', alertUser);
    return () => {
      window.removeEventListener('beforeunload', alertUser);
    };
  }, []);

  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = 'Uważaj! Jeśli opuścisz grę, nie będziesz mógł do niej wrócić.';
  };
  // wsClient init i jego logika
  const callback = function (message) {
    if (message.type === messageType.START_GAME) {
      setGameState('playing');
    }
    if (message.type === messageType.ANSWERS) {
      // dostaje możliwe odpowiedzi do pytania (Runda)
      setAnswers(message.body);
    }
  };
  useEffect(() => {
    client.deactivate();
    client.activate();
    client.onConnect = (frame) => {
      client.subscribe(`/topic/public/${pin}`, callback);
      client.publish({
        destination: `/app/chat/${pin}.newUser`,
        body: chatMessage(nick, '', messageType.CONNECT)
      });
    };
  }, [pin, nick]);

  // Odpowiedź na pytanie
  const handleClick = (answer) => {
    if (client) {
      client.publish({
        destination: `/app/chat/${pin}.send`,
        // zmienić message type na odpowiedni
        body: chatMessage(nick, answer, messageType.CHAT),
        skipContentLengthHeader: true
      });
    }
  };
  // Odpowiedz 1-4 może jakiś tekst
  // Font size nicku wiekszy i moze tutaj wykres wyników?

  return (
    <div>
      {gameState === 'waiting' ? (
        <Loding />
      ) : (
        <div className="h-screen">
          <div className="flex h-1/5 items-end justify-center">
            <PointsChart players={wyniki} />
          </div>
          <div className="grid h-4/5 grid-cols-2 grid-rows-2 gap-2 overflow-hidden">
            <button
              className={`box row-start-1 row-end-1 bg-blue-700`}
              id="1"
              onClick={() => handleClick(1)}
            >
              {answers[0]}
            </button>
            <button
              className={`box col-span-2 col-start-2 bg-pastel-green-700`}
              id="2"
              onClick={() => handleClick(2)}
            >
              {answers[1]}
            </button>
            <button
              className={`box col-span-2 col-start-2 bg-sahara-sand-700`}
              id="3"
              onClick={() => handleClick(3)}
            >
              {answers[2]}
            </button>
            <button
              className={`box row-start-2 row-end-2 bg-froly-700`}
              id="4"
              onClick={() => handleClick(4)}
            >
              {answers[3]}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhoneView;
