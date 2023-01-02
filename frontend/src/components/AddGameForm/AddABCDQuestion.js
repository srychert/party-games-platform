import { useState } from 'react';

function AddABCDQuestion({ dispatch, setType }) {
  const options = ['Option A', 'Option B', 'Option C', 'Option D'];
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(Array(options.length).fill(''));
  const [correct, setCorrect] = useState(0);

  const addAnswer = (answer, index) => {
    let newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const renderInput = (placeholder, index) => {
    return (
      <input
        key={placeholder}
        type={'text'}
        value={answers[index]}
        className="form-input text-center"
        placeholder={placeholder}
        onChange={(e) => addAnswer(e.target.value, index)}
        required={true}
      />
    );
  };

  const addQuestion = () => {
    // TODO validate data before dispatch
    dispatch({
      type: 'add_question',
      payload: {
        type: 'ABCD',
        question,
        answers,
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

      <div className={'grid grid-cols-2 gap-2'}>
        {options.map((option, index) => renderInput(option, index))}
      </div>

      <div className="flex w-full flex-col py-2">
        <label htmlFor="correct">Correct Answer</label>
        <select
          id="correct"
          value={correct}
          onChange={(e) => setCorrect(e.target.value)}
          required={true}
          className="form-input"
        >
          <option value={0}>A</option>
          <option value={1}>B</option>
          <option value={2}>C</option>
          <option value={3}>D</option>
        </select>
      </div>

      <button className="btn-form" onClick={addQuestion}>
        Add question
      </button>
    </div>
  );
}

export default AddABCDQuestion;
