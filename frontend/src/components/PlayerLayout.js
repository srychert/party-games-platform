import React, { useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SockJsClientDefaults } from '../services/SockJsClientDefaults';
import Join from '../views/PlayerViews/Join';
import Quiz from '../views/PlayerViews/Quiz';

function PlayerLayout() {
  const [topics, setTopics] = useState([]);
  const [handleMessage, setHandleMessage] = useState({
    fn: (msg) => console.log(msg),
  });

  const client = useRef(null);

  const props = {
    client,
    topics,
    setTopics,
    handleMessage,
    setHandleMessage,
  };

  return (
    <>
      <SockJsClientDefaults
        topics={topics}
        onConnect={() => console.log('connected')}
        onDisconnect={() => console.log('disconnected')}
        onMessage={handleMessage.fn}
        ref={client}
      />
      <Routes>
        <Route path="join" exact element={<Join {...props} />} />
        <Route path="quiz/:pin" element={<Quiz {...props} />} />
      </Routes>
    </>
  );
}

export default PlayerLayout;
