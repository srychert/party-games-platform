import React, { useContext } from 'react';
import GameAction from './GameAction';
import Loading from '../../../views/Loading';
import playContext from '../../../context/PlayContext';
import Skip from './NodeOptions/Skip';
import Fight from './NodeOptions/Fight';
import Heal from './NodeOptions/Heal';
import Merchant from './NodeOptions/Merchant';

function GameView({ handleNextNode, handleNodeOption }) {
  const { player, nodes } = useContext(playContext);

  console.log(nodes);
  console.log(player);

  return (
    <div className="h-full w-full overflow-hidden">
      <div className="flex h-1/4 w-full flex-col border">
        <GameAction />
      </div>
      {/** To jest po akcji w nodzie, wybierasz kolejną drogę */}
      {player.canChooseNode == true && (
        <div className="m-1 grid h-4/5 w-full grid-cols-2 gap-2">
          {nodes.map((nextNode, index) => (
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
      {player.currentRoundCompleted == false && (
        <div className="m-1 grid h-4/5 w-full grid-cols-2 gap-2">
          {player.currentNode == 0 && <Skip handleNodeOption={handleNodeOption} />}
          {player.currentNode == 1 && <Fight handleNodeOption={handleNodeOption} />}
          {player.currentNode == 2 && <Heal handleNodeOption={handleNodeOption} />}
          {player.currentNode == 3 && <Merchant handleNodeOption={handleNodeOption} />}
        </div>
      )}
      {player.currentRoundCompleted == true && player.canChooseNode == false && (
        <Loading message={'Waiting for other players'} />
      )}
    </div>
  );
}

export default GameView;
