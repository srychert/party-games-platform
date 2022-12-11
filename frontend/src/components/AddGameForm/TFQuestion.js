import React, { useState } from 'react';

function TFQuestion({ correct, setCorrect }) {
  const buttonClass = 'flex flex-col justify-center items-center h-10 w-60 button';

  const handleChange = (event) => {
    const target = event.target;
    if (target.checked) {
      setCorrect(event.target.value);
    }
  };

  return (
    <div className={'flex flex-col items-center justify-center'}>
      <div className={'flex flex-row'}>
        <div className="flex flex-row gap-3 p-3">
          <label>True</label>
          <input
            type={'radio'}
            value={'t'}
            checked={correct === 't'}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row gap-3 p-3">
          <label>False</label>
          <input
            type={'radio'}
            value={'f'}
            checked={correct === 'f'}
            onChange={handleChange}
          />
        </div>
      </div>
      <button className={buttonClass} type={'submit'}>
        Add question
      </button>
    </div>
  );
}

export default TFQuestion;
