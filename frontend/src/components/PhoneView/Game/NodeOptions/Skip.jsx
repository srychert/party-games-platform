import React, { useContext } from 'react';
import playContext from '../../../../context/PlayContext';

function Skip({ handleNodeOption }) {
  const { player } = useContext(playContext);
  return (
    <>
      <button className="answerBox" onClick={() => handleNodeOption(player.options[0])}>
        Skip
      </button>
      {[...Array(3).keys()].map((fakeButton) => {
        return <button className="answerBox" key={`skip-${fakeButton}`}></button>;
      })}
    </>
  );
}

export default Skip;
