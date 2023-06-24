import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SockJsClientDefaults } from '../services/SockJsClientDefaults';
import Join from '../views/PlayerViews/Join';
import Quiz from '../views/PlayerViews/Quiz';
import NavigationBar from './NavigationBar/NavigationBar';
import Game from '../views/PlayerViews/Game';
import Result from '../views/PlayerViews/Result';

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
      <NavigationBar
        buttons={[
          { to: '/', text: 'Home' },
          { to: '/player/join', text: 'Player' },
        ]}
        showNavbarInit={true}
        loggedIn={false}
      />
      <main className="h-full w-full">
        <Routes>
          <Route path="/join" exact element={<Join {...props} />} />
          <Route path="/quiz/:pin" element={<Quiz {...props} />} />
          <Route path="/game/:pin" element={<Game {...props} />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </main>
    </>
  );
}

export default PlayerLayout;
