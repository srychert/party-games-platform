import React from 'react';
import { IconContext } from 'react-icons';
import switchButton from '../NavigationBar/IconMapper';

function BurgerButton({ onClick }) {
  return (
    <button
      className="buttonSmall flex flex-col items-center justify-center gap-1"
      onClick={onClick}
    >
      <IconContext.Provider value={{ size: '2em' }}>
        {switchButton('menu')}
      </IconContext.Provider>
    </button>
  );
}

export default BurgerButton;
