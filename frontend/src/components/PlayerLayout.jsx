import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SockJsClientDefaults } from '../services/SockJsClientDefaults';
import TestView from '../views/TestView';
import Join from '../views/PlayerViews/Join';
import Quiz from '../views/PlayerViews/Quiz';
import NavigationBar from './NavigationBar/NavigationBar';

function PlayerLayout() {
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
      <NavigationBar buttons={[
        { to: '/', text: 'Home' },
        { to: '/player', text: 'Player' }
        ]}
        showNavbarInit={true}
        loggedIn={false} />
      <Routes>
        <Route path="join" exact element={<Join {...props} />} />
        <Route path="quiz/:pin" element={<Quiz {...props} />} />
        <Route path="test" element={<TestView {...props} />} />
      </Routes>
    </>
  );
}

export default PlayerLayout;
