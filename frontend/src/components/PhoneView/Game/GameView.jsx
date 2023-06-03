import React, { useContext } from 'react';
import GameAction from './GameAction';
import Loading from '../../../views/Loading';
import playContext from '../../../context/PlayContext';
import Skip from './NodeOptions/Skip';
import Fight from './NodeOptions/Fight';
import Heal from './NodeOptions/Heal';
import Merchant from './NodeOptions/Merchant';
import { NODES } from '../../../enums/NodeTypes';

function GameView({ handleNextNode, handleNodeOption }) {
  const { player, nextNodes, currentNode } = useContext(playContext);

  console.log(player);

  return (
    <div className="h-full w-full overflow-hidden">
      <div className="flex h-1/4 w-full flex-col border">
        <GameAction />
      </div>
      {player.currentRoundCompleted == true && player.canChooseNode == false && (
        <Loading message={'Waiting for other players'} />
      )}
      {/** To jest po akcji w nodzie, wybierasz kolejną drogę */}
      {player.canChooseNode == true && (
        <div className="m-1 grid h-4/5 w-full grid-cols-2 gap-2">
          {nextNodes.map((nextNode, index) => (
            <button
              className="answerBox"
              key={index}
              onClick={() => handleNextNode(nextNode.id)}
            >
              {nextNode.type}
            </button>
          ))}
        </div>
      )}

      {/** To akcja w nodzie, wybierasz opcje noda (params?) */}
      {player.currentRoundCompleted == false && player.canChooseNode == false && (
        <div className="m-1 grid h-4/5 w-full grid-cols-2 gap-2">
          {currentNode.type === NODES.SKIP && (
            <Skip handleNodeOption={handleNodeOption} />
          )}
          {currentNode.type === NODES.FIGHT && (
            <Fight handleNodeOption={handleNodeOption} />
          )}
          {currentNode.type === NODES.HEAL && (
            <Heal handleNodeOption={handleNodeOption} />
          )}
          {currentNode.type === NODES.MERCHANT && (
            <Merchant handleNodeOption={handleNodeOption} />
          )}
        </div>
      )}
    </div>
  );
}

export default GameView;

// game ended view
