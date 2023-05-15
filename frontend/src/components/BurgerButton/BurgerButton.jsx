import React from 'react';
import { IconContext } from 'react-icons';
import switchButton from '../NavigationBar/IconMapper';

function BurgerButton({ onClick, position }) {
  return (
    <button
      className={`buttonSmall z-50 flex flex-col items-center justify-center gap-1 ${position}`}
      onClick={onClick}
    >
      <IconContext.Provider value={{ size: '2em' }}>
        {position === 'absolute' ? switchButton('menu') : switchButton('menuOpen')}
      </IconContext.Provider>
    </button>
  );
}

export default BurgerButton;
