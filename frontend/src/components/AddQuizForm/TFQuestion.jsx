import React, { useState } from 'react';

function TFQuestion({ dispatch, setType }) {
  const [question, setQuestion] = useState('');
  const [correct, setCorrect] = useState(0);

  const addQuestion = () => {
    // TODO validate data before dispatch
    dispatch({
      type: 'add_question',
      payload: {
        type: 'TF',
        question,
        answers: ['true', 'false'],
        correct,
      },
    });

    // newQuestion
    setType('');
  };

  return (
    <div className={'flex flex-col items-center justify-center'}>
      <div className="flex w-full flex-col pb-2">
        <label>Question</label>
        <input
          type={'text'}
          value={question}
          placeholder={'Question'}
          className="form-input"
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>

      <div className={'flex flex-row'}>
        <div className="flex flex-row gap-3 p-3">
          <label htmlFor="box-true">True</label>
          <input
            id="box-true"
            type={'radio'}
            checked={correct === 0}
            onChange={() => setCorrect(0)}
          />
        </div>
        <div className="flex flex-row gap-3 p-3">
          <label htmlFor="box-false">False</label>
          <input
            id="box-false"
            type={'radio'}
            checked={correct === 1}
            onChange={() => setCorrect(1)}
          />
        </div>
      </div>
      <button className="button w-full" onClick={addQuestion}>
        Add question
      </button>
    </div>
  );
}

export default TFQuestion;
