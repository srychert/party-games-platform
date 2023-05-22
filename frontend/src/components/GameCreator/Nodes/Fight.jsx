import React, { useContext } from 'react';
import EnemyTypeSelect from '../Select/EnemyTypeSelect';
import { GameContext } from '../gameContext';

// TODO
function Fight({ node, setNode }) {
  const { enemies, items } = useContext(GameContext);

  return (
    <div>
      <EnemyTypeSelect node={node} setNode={setNode} enemies={enemies} />
    </div>
  );
}

export default Fight;
