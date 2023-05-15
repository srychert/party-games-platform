import React, { useState } from 'react';
import GameView from '../../components/PhoneView/Game/GameView';

function Game(props) {
  const { client, setTopics, setHandleMessage } = props;
  const [answers, setAnswers] = useState(['a', 'b', 'c', 'd']);

  const onMessageReceived = function (msg) {};

  return (
    <>
      <GameView answers={answers} />
    </>
  );
}

export default Game;
