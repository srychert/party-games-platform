import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SockJsClientDefaults } from '../services/SockJsClientDefaults';
import MainQuiz from '../views/HostViews/MainQuiz';
import QuizRoom from '../views/HostViews/QuizRoom';
import TestView from '../views/TestView';
import GameRoom from '../views/HostViews/GameRoom';
import MainGame from '../views/HostViews/MainGame';

function HostLayoutConnected() {
  const [topics, setTopics] = useState([]);
  const [connected, setConnected] = useState(false);

  const [handleMessage, setHandleMessage] = useState({
    fn: (msg) => console.log(msg),
  });
  const [handleConnect, setHandleConnect] = useState({
    fn: () => {
      console.log('connected');
      setConnected(true);
    },
  });

  const [handleDisconnect, setHandleDisconnect] = useState({
    fn: () => console.log('disconnected'),
  });

  const client = useRef(null);

  useEffect(() => {
    setConnected(client.current?.state.connected);
  }, [client.current?.state]);

  const props = {
    client,
    topics,
    setTopics,
    handleMessage,
    setHandleMessage,
    handleConnect,
    setHandleConnect,
    handleDisconnect,
    setHandleDisconnect,
    connected,
  };

  return (
    <>
      <SockJsClientDefaults
        topics={topics}
        onConnect={handleConnect.fn}
        onDisconnect={handleDisconnect.fn}
        onMessage={handleMessage.fn}
        ref={client}
      />
      <Routes>
        <Route path="quiz/:id" element={<QuizRoom {...props} />} />
        <Route path="quiz/:id/quiz-room/:pin" element={<MainQuiz {...props} />} />
        <Route path="game/:id" element={<GameRoom {...props} />} />
        <Route path="game/:id/game-room/:pin" element={<MainGame {...props} />} />
        <Route path="test" element={<TestView {...props} />} />
      </Routes>
    </>
  );
}

export default HostLayoutConnected;
