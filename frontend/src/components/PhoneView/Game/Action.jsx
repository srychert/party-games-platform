import React, { useContext } from 'react';
import playContext from '../../../context/PlayContext';

function Action() {
  const { player, nodes, error } = useContext(playContext);

  const ActionType = () => {
    switch (player.currentNode) {
      case 0:
        return <div className="text-center">START</div>;
      case 1:
        return <div className="text-center">SKIP</div>;
      case 2:
        return <div className="text-center">FIGHT</div>;
      case 3:
        return <div className="text-center">HEAL</div>;
      case 4:
        return <div className="text-center">MERCHANT</div>;
      default:
        return <div className="text-center">U LOST? lol</div>;
    }
  };

  return (
    <div className="flex-col">
      {ActionType()}
      {error && <div>{error}</div>}
    </div>
  );
}

export default Action;
