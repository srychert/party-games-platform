import React, { useContext } from 'react';
import GameAction from './GameAction';
import Loading from '../../../views/Loading';
import playContext from '../../../context/PlayContext';

function GameView({ handleNextNode, handleNodeOption }) {
  const { player, nodes } = useContext(playContext);

  return (
    <div className="h-full w-full overflow-hidden">
      <div className="flex h-1/4 w-full flex-col border">
        <GameAction />
      </div>
      {/** To jest po akcji w nodzie, wybierasz kolejną drogę */}
      {player.currentRoundCompleted == true && player.canChooseNode == true && (
        <div className="m-1 grid h-4/5 w-full grid-cols-2 gap-2">
          {nodes.nextNodesID.map((answer, index) => (
            <button
              className="answerBox"
              key={index}
              onClick={() => handleNextNode(index)}
            >
              {answer}
            </button>
          ))}
        </div>
      )}

      {/** To akcja w nodzie, wybierasz opcje noda */}
      {player.currentRoundCompleted == false && (
        <div className="m-1 grid h-4/5 w-full grid-cols-2 gap-2">
          {player.options.map((option, index) => (
            <button
              className="answerBox"
              key={index}
              onClick={() => handleNodeOption(option)}
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
      {player.currentRoundCompleted == true && player.canChooseNode == false && (
        <Loading message={'Waiting for other players'} />
      )}
    </div>
  );
}

export default GameView;
