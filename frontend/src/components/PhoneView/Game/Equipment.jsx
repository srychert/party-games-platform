import React, { useContext } from 'react';
import ItemMapper from '../../GameIconMapper/ItemMapper';
import EnemyMapper from '../../GameIconMapper/EnemyMapper';
import playContext from '../../../context/PlayContext';

function Equipment() {
  const { player, nodes } = useContext(playContext);
  console.log(player, nodes);
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
