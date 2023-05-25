import React, { useContext } from 'react';
import playContext from '../../../context/PlayContext';

function Stats() {
  const { player } = useContext(playContext);
  return (
    <>
      <div className="flex gap-4 whitespace-nowrap text-xl font-bold">
        <div className="flex flex-col">
          <span>Attack:</span>
          <span>HP:</span>
          <span>Gold:</span>
          <span>Speed:</span>
        </div>

        <div>
          <div>{player.atk}</div>
          <div>{player.hp}</div>
          <div>{player.gold}</div>
          <div>{player.speed}</div>
        </div>
      </div>
    </>
  );
}

export default Stats;
