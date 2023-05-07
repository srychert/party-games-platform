import React from 'react';
import GameAction from './GameAction';

function GameView(props) {
  return (
    <div className="h-full w-full">
      <div className="flex h-1/4 w-full flex-col border">
        <GameAction />
      </div>
      <div className="m-1 grid h-4/5 w-full grid-cols-2 gap-2">
        {['a', 'b', 'c', 'd'].map((answer, index) => (
          <button className="answerBox" key={index}>
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GameView;
