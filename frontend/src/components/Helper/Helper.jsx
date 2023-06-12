import react, { useState } from 'react';
import { gameNodes, gameEnemies } from './GameElements';
import switchIcon from '../NavigationBar/IconMapper';
import { IconContext } from 'react-icons';
import getImgUrl from '../../services/FileService';
import { useItems } from '../../hooks/game/useItems';
import { useEnemies } from '../../hooks/game/useEnemies';
import Loading from '../../views/Loading';
import Error from '../../views/Error';
import { itemTypeToString, itemEffectsToString } from '../../utils/ItemUtils';
import { enemieTypeToString } from '../../utils/EnemyUtils';
import EnemiesStats from './EnemiesStats';
import ItemsStats from './ItemsStats';

const gameElements = {
  NODES: 'Nodes with descriptions',
  ITEMS: 'Items with default stats',
  ENEMY: 'Enemies with default stats',
};

function Helper() {
  const [helpElement, setHelpElement] = useState(gameElements.NODES);
  const gameNodeStyle = `
    border-b-2 border-b-gray-500 p-2 flex items-center
    `;

  const itemsQuery = useItems();
  const enemiesQuery = useEnemies();

  if (itemsQuery.isLoading || enemiesQuery.isLoading) {
    return <Loading />;
  }
  if (itemsQuery.isError || enemiesQuery.isError) {
    return <Error message={itemsQuery.error?.message} />;
  }

  const handleOnClick = (direction) => {
    switch (helpElement) {
      case gameElements.NODES:
        if (direction === '/help/left') {
          setHelpElement(gameElements.ITEMS);
        }
        if (direction === '/help/right') {
          setHelpElement(gameElements.ENEMY);
        }
        break;
      case gameElements.ITEMS:
        if (direction === '/help/left') {
          setHelpElement(gameElements.ENEMY);
        }
        if (direction === '/help/right') {
          setHelpElement(gameElements.NODES);
        }
        break;
      case gameElements.ENEMY:
        if (direction === '/help/left') {
          setHelpElement(gameElements.NODES);
        }
        if (direction === '/help/right') {
          setHelpElement(gameElements.ITEMS);
        }
        break;
      default:
        setHelpElement(gameElements.NODES);
        break;
    }
  };

  return (
    <div className="h-3/4 w-full overflow-y-scroll">
      <div className="sticky top-0 flex w-full justify-between bg-stone-300 p-2">
        <button onClick={() => handleOnClick('/help/left')}>
          <IconContext.Provider value={{ size: '2em' }}>
            {switchIcon('/help/left')}
          </IconContext.Provider>
        </button>
        <div className="text-center font-bold">{helpElement}:</div>
        <button onClick={() => handleOnClick('/help/right')}>
          <IconContext.Provider value={{ size: '2em' }}>
            {switchIcon('/help/right')}
          </IconContext.Provider>
        </button>
      </div>
      <div className="grid grid-cols-2 p-2">
        {helpElement === gameElements.NODES &&
          gameNodes.map((element, index) => (
            <>
              <div className={gameNodeStyle} key={`node_name-${index}`}>
                {element.name}
              </div>
              <div className={gameNodeStyle} key={`node_desc-${index}`}>
                {element.desc}
              </div>
            </>
          ))}
        {helpElement === gameElements.ITEMS &&
          itemsQuery.data.map((element, index) => (
            <>
              <div className={gameNodeStyle} key={`item_name-${index}`}>
                <img
                  src={getImgUrl(`${element?.path}`)}
                  alt={element.name}
                  className="m-2 h-10 w-10"
                />
                <div>{itemTypeToString(element.type)}</div>
              </div>
              <div className={gameNodeStyle} key={`item_stats-${index}`}>
                <ItemsStats itemStats={itemEffectsToString(element.itemEffectMap)} />
              </div>
            </>
          ))}
        {helpElement === gameElements.ENEMY &&
          enemiesQuery.data.map((element, index) => (
            <>
              <div className={gameNodeStyle} key={`enemy_name-${index}`}>
                <img
                  src={getImgUrl(`${element?.path}`)}
                  alt={element.name}
                  className="m-2 h-10 w-10"
                />
                <div>{enemieTypeToString(element.type)}</div>
              </div>
              <div className={gameNodeStyle} key={`enemy_stats-${index}`}>
                <EnemiesStats enemie={element} />
              </div>
            </>
          ))}
      </div>
    </div>
  );
}

export default Helper;
