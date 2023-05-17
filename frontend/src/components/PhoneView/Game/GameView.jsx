import React from 'react';
import GameAction from './GameAction';
import { useLocation } from 'react-router-dom';

function GameView({ handleAnswer }) {
  const location = useLocation();
  const { player, node } = JSON.parse(location.state.player);

  return (
    <div className="h-full w-full">
      <div className="flex h-1/4 w-full flex-col border">
        <GameAction />
      </div>
      <div className="m-1 grid h-4/5 w-full grid-cols-2 gap-2">
        {node.nextNodesID.map((answer, index) => (
          <button className="answerBox" key={index} onClick={() => handleAnswer(index)}>
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GameView;
