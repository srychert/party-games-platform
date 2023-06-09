import react, { useState } from 'react';
import { gameNodes, gameItems, gameEnemies } from './GameElements';
import switchIcon from '../NavigationBar/IconMapper';
import { IconContext } from 'react-icons';
import getImgUrl from '../../services/FileService';

const gameElements = {
  NODES: 'Nodes',
  ITEMS: 'Items',
  ENEMY: 'Enemy',
};

function Help() {
  const gameNodeStyle = `
    border-b-2 border-b-gray-500 p-2 flex items-center
    `;
  const headerStyle = `
    text-center
    `;
  const [helpElement, setHelpElement] = useState(gameElements.NODES);
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
      <div className="grid grid-cols-2 justify-center">
        <div className={headerStyle}>Element</div>
        <div className={headerStyle}>Description</div>
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
          gameItems.map((element, index) => (
            <>
              <div className={gameNodeStyle}>
                <img
                  src={getImgUrl(`${element?.path}`)}
                  alt={element.name}
                  className="m-2 h-10 w-10"
                />
                <div>{element.name}</div>
              </div>
              <div className={gameNodeStyle}>
                <div>{element.desc}</div>
              </div>
            </>
          ))}
        {helpElement === gameElements.ENEMY &&
          gameEnemies.map((element, index) => (
            <>
              <div className={gameNodeStyle}>
                <img
                  src={getImgUrl(`${element?.path}`)}
                  alt={element.name}
                  className="m-2 h-10 w-10"
                />
                <div>{element.name}</div>
              </div>
              <div></div>
            </>
          ))}
      </div>
    </div>
  );
}

export default Help;
