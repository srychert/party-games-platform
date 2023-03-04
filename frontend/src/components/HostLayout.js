import React, { useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SockJsClientDefaults } from '../services/SockJsClientDefaults';
import FinalResults from '../views/HostViews/FinalResults';
import MainQuiz from '../views/HostViews/MainQuiz';
import QuizRoom from '../views/HostViews/QuizRoom';

function HostLayout() {
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
        <Route path=":id" element={<QuizRoom {...props} />} />
        <Route path=":id/quiz-room/:pin" element={<MainQuiz {...props} />} />
        <Route path=":id/finalresults/:pin" element={<FinalResults {...props} />} />
      </Routes>
    </>
  );
}

export default HostLayout;
