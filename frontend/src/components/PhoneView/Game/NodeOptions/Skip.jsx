import React from 'react';

function Skip({ handleNodeOption }) {
  return (
    <>
      <button className="answerBox" onClick={() => handleNodeOption()}>
        Skip
      </button>
    </>
  );
}

export default Skip;
