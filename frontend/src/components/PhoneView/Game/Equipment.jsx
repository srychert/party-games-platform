import React from 'react';
import { useLocation } from 'react-router-dom';

function Equipment(props) {
  const location = useLocation();
  const { player, node } = JSON.parse(location.state.player);
  console.log(player, node);
  return (
    <>
      <div>{player.gold}</div>
    </>
  );
}

export default Equipment;
