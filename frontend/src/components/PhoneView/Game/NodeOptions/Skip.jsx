import React, { useContext } from 'react';
import playContext from '../../../../context/PlayContext';

function Skip({ handleNodeOption }) {
  const { player } = useContext(playContext);
  return (
    <>
      <button className="answerBox" onClick={() => handleNodeOption(player.options[0])}>
        Skip
      </button>
    </>
  );
}

export default Skip;
