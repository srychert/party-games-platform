import React from 'react';
import Flow from '../../components/GameCreator/Flow';
import { useItems } from '../../hooks/game/useItems';
import { useEnemies } from '../../hooks/game/useEnemies';
import Loading from '../Loading';

function AddGame() {
  const itemsQuery = useItems();
  const enemiesQuery = useEnemies();

  if (itemsQuery.isError || enemiesQuery.isError) {
    return (
      <div>
        <span>Error: {itemsQuery.error?.message}</span>
      </div>
    );
  }

  if (itemsQuery.isLoading || enemiesQuery.isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-full">
      <Flow items={itemsQuery.data} enemies={enemiesQuery.data} />
    </div>
  );
}

export default AddGame;
