import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InitialState from './InitialState';
import AddQuestions from './AddQuestions';
import useNewGame from '../hooks/useNewGame';

function AddGame() {
  const naviagte = useNavigate();
  const [initialState, setInitialState] = useState(true);
  const [iStateData, setIStateData] = useState({
    name: '',
    description: '',
    type: '',
    debufs: false,
  });

  const [questions, setQuestions] = useState([]);

  return (
    <div className="flex min-h-screen items-center justify-center align-middle">
      {initialState ? (
        <InitialState setInitialState={setInitialState} setIStateData={setIStateData} />
      ) : (
        <AddQuestions
          iStateData={iStateData}
          setIStateData={setIStateData}
          questions={questions}
          setQuestions={setQuestions}
        />
      )}
    </div>
  );
}

export default AddGame;
