import react, { useState } from 'react';
import { gameNodes, gameItems } from './GameElements';
import switchIcon from '../NavigationBar/IconMapper';
import { IconContext } from 'react-icons';
import getImgUrl from '../../services/FileService';

const gameElements = {
  NODES: 'Nodes',
  ITEMS: 'Items',
};

function Help() {
  const gameNodeStyle = `
    border-b-2 border-b-gray-500 p-2 flex
    `;
  const headerStyle = `
    text-center
    `;
  const [helpElement, setHelpElement] = useState(gameElements.NODES);
  const handleOnClick = (direction) => {
    if (direction === '/help/left') {
      if (helpElement === gameElements.NODES) {
        setHelpElement(gameElements.ITEMS);
      } else {
        setHelpElement(gameElements.NODES);
      }
    } else if (direction === '/help/right') {
      if (helpElement === gameElements.NODES) {
        setHelpElement(gameElements.ITEMS);
      } else {
        setHelpElement(gameElements.NODES);
      }
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
                  className="h-6 w-6"
                />
                {element.name}
              </div>
              <div className={gameNodeStyle}>{element.desc}</div>
            </>
          ))}
      </div>
    </div>
  );
}

export default Help;
