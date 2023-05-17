import React from 'react';
import { useLocation } from 'react-router-dom';

function Stats() {
  const location = useLocation();
  const { player } = JSON.parse(location.state.player);
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
