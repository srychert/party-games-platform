import React, { useState } from 'react';
import Action from './Action';
import Stats from './Stats';
import Equipment from './Equipment';
import { IconContext } from 'react-icons';
import switchIcon from '../../NavigationBar/IconMapper';

function GameAction(props) {
  const [view, setView] = useState('action');
  const { player } = props;

  return (
    <>
      <nav className="flex flex-row justify-between">
        <button className="buttonSmall" onClick={() => setView('stats')}>
          <IconContext.Provider value={{ size: '2em' }}>
            {switchIcon('stats')}
          </IconContext.Provider>
        </button>
        <button className="buttonSmall" onClick={() => setView('action')}>
          <IconContext.Provider value={{ size: '2em' }}>
            {switchIcon('gameAction')}
          </IconContext.Provider>
        </button>
        <button className="buttonSmall" onClick={() => setView('eq')}>
          <IconContext.Provider value={{ size: '2em' }}>
            {switchIcon('equipment')}
          </IconContext.Provider>
        </button>
      </nav>
      <div className="flex h-full items-center justify-center">
        {view === 'action' ? <Action /> : null}
        {view === 'stats' ? <Stats props={player} /> : null}
        {view === 'eq' ? <Equipment props={player} /> : null}
      </div>
    </>
  );
}

export default GameAction;
