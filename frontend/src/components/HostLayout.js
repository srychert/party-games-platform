import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SockJsClientDefaults } from '../services/SockJsClientDefaults';
import FinalResults from '../views/HostViews/FinalResults';
import MainQuiz from '../views/HostViews/MainQuiz';
import QuizRoom from '../views/HostViews/QuizRoom';

function HostLayout() {
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
        <Route path=":id" element={<QuizRoom {...props} />} />
        <Route path=":id/quiz-room/:pin" element={<MainQuiz {...props} />} />
        <Route path=":id/finalresults/:pin" element={<FinalResults {...props} />} />
      </Routes>
    </>
  );
}

export default HostLayout;
