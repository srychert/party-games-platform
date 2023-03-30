import React from 'react';
import GameAction from './GameAction';

function GameView(props) {
  const { answers, handleClick, player } = props;

  return (
    <div className="h-full w-full">
      <div className="flex h-1/4 w-full flex-col border">
        <GameAction />
      </div>
      <div className="m-1 grid h-4/5 w-full grid-cols-2 gap-2">
        {answers.map((answer, index) => (
          <div className="answerBox" key={index}>
            {answer.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameView;
