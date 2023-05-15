import React, { useState } from 'react';
import ABCD from './ABCD';
import TF from './TF';

function GameType({ type, answers, handleClick }) {
  return (
    <div className="flex h-full w-full">
      {type === 'ABCD' ? <ABCD answers={answers} handleClick={handleClick} /> : null}
      {type === 'TF' ? <TF answers={answers} handleClick={handleClick} /> : null}
    </div>
  );
}

export default GameType;
