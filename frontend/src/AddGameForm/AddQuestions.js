import React, { useState } from 'react';
import AddABCDQuestion from './AddABCDQuestion';
import InputQuestion from './InputQuestion';
import TFQuestion from './TFQuestion';

function AddQuestions({ iStateData, setIStateData, questions, setQuestions }) {
  const [type, setType] = useState('');
  const [qusetion, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);
  const [correct, setCorrect] = useState('t');

  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [d, setD] = useState('');

  const abcdProps = { setCorrect, setA, setB, setC, setD };

  const inputProps = { setCorrect };

  const tfProps = { correct, setCorrect };

  const handleNext = (event) => {
    event.preventDefault();
    const newQuestion = {
      type: type,
      question: qusetion,
      answers: [a, b, c, d],
      correct: correct,
    };
    setQuestions([...questions, newQuestion]);
    setType('');
    setQuestion('');
    setAnswers([]);
    setCorrect('t');
    setA('');
    setB('');
    setC('');
    setD('');
  };

  const handleSubmit = () => {
    setIStateData(iStateData);
    const game = {
      name: iStateData.name,
      description: iStateData.description,
      type: iStateData.type,
      questions: questions,
      debufs: iStateData.debufs,
      createdBy: 'N/A',
    };
    // useNewGame(game)
    // naviagte("/gdziekolwiek")
    window.alert(JSON.stringify(game));
    window.location.reload('false');
    console.log(game);
  };

  const buttonClass = 'flex flex-col justify-center items-center h-10 w-60 button';

  return (
    <div className={'flex flex-col'}>
      <div className={'flex min-h-screen items-center justify-center align-middle'}>
        <form onSubmit={handleNext}>
          <div className="flex flex-col items-center justify-center gap-20">
            <div className="flex flex-col content-start p-3">
              <label>Set question type:</label>
              <select value={''} onChange={(e) => setType(e.target.value)}>
                <option value={''}>select</option>
                <option value={'abcd'}>ABCD</option>
                <option value={'true/false'}>true/false</option>
                <option value={'input'}>input</option>
              </select>
            </div>
            <div className="flex flex-col p-3">
              <label>Set question:</label>
              <input
                value={qusetion}
                type={'text'}
                placeholder={'question'}
                onChange={(e) => setQuestion(e.target.value)}
                required={true}
              />
            </div>
          </div>
          <div>
            {type === 'abcd' ? (
              <AddABCDQuestion {...abcdProps} />
            ) : type === 'input' ? (
              <InputQuestion {...inputProps} />
            ) : type === 'true/false' ? (
              <TFQuestion {...tfProps} />
            ) : null}
          </div>
          <div className={'flex items-center justify-center '}>
            {questions.length > 0 ? (
              <button className={buttonClass} onClick={handleSubmit}>
                Submit Game
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddQuestions;
