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
  NODES: 'Nodes',
  ITEMS: 'Items',
  ENEMY: 'Enemy',
};

function Helper() {
  const [helpElement, setHelpElement] = useState(gameElements.NODES);
  const gameNodeStyle = `
    border-b-2 border-b-gray-500 p-2 flex items-center
    `;
  const gameItemsStyle = `
    flex flex-col border-b-2 border-b-gray-500 p-2 flex items-center
    `;
  const gameEnemiesStyle = `
    flex flex-col border-b-2 border-b-gray-500 p-2 flex items-center
    `;

  const itemsQuery = useItems();
  const enemiesQuery = useEnemies();

  if (itemsQuery.isLoading || enemiesQuery.isLoading) {
    return <Loading />;
  }
  if (itemsQuery.isError || enemiesQuery.isError) {
    return <Error message={itemsQuery.error?.message} />;
  }

  console.log(enemiesQuery.data);

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
      <div className="m-auto flex w-3/4 justify-between">
        <button onClick={() => handleOnClick('/help/left')}>
          <IconContext.Provider value={{ size: '2em' }}>
            {switchIcon('/help/left')}
          </IconContext.Provider>
        </button>
        <div className="text-center">{helpElement}:</div>
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
              <div className={gameNodeStyle}>{element.name}</div>
              <div className={gameNodeStyle}>{element.desc}</div>
            </>
          ))}
        {helpElement === gameElements.ITEMS &&
          itemsQuery.data.map((element, index) => (
            <>
              <div className={gameNodeStyle}>
                <img
                  src={getImgUrl(`${element?.path}`)}
                  alt={element.name}
                  className="m-2 h-10 w-10"
                />
                <div>{itemTypeToString(element.type)}</div>
              </div>
              <div className={gameItemsStyle}>
                <ItemsStats itemStats={itemEffectsToString(element.itemEffectMap)} />
              </div>
            </>
          ))}
        {helpElement === gameElements.ENEMY &&
          enemiesQuery.data.map((element, index) => (
            <>
              <div className={gameNodeStyle}>
                <img
                  src={getImgUrl(`${element?.path}`)}
                  alt={element.name}
                  className="m-2 h-10 w-10"
                />
                <div>{enemieTypeToString(element.type)}</div>
              </div>
              <div className={gameEnemiesStyle}>
                <EnemiesStats enemie={element} />
              </div>
            </>
          ))}
      </div>
    </div>
  );
}

export default Helper;
