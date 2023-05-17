import React from 'react';
import { useLocation } from 'react-router-dom';
import ItemMapper from '../../GameIconMapper/ItemMapper';
import EnemyMapper from '../../GameIconMapper/EnemyMapper';

function Equipment(props) {
  const location = useLocation();
  const { player, node } = JSON.parse(location.state.player);
  console.log(player, node);
  return (
    <>
      <div>
        {player.gold}
        <div>
          <ItemMapper gameType={'item name'} />
          <EnemyMapper gameType={'enemy name'} />
        </div>
      </div>
    </>
  );
}

export default Equipment;
