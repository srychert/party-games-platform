import React, { useReducer, useState } from 'react';
import InitialState from '../../components/AddQuizForm/InitialState';
import AddQuestions from '../../components/AddQuizForm/AddQuestions';
import { Navigate, useNavigate } from 'react-router-dom';
import { useApi } from '../../context/ApiProvider';
import { useCookies } from 'react-cookie';
import { useAddQuiz } from '../../hooks/useAddQuiz';
import Loading from '../Loading';
import NavigationBar from '../../components/NavigationBar/NavigationBar';

function reducer(state, action) {
  switch (action.type) {
    case 'add_game_info': {
      return {
        ...state,
        title: action.payload.title,
        description: action.payload.description,
        debufs: action.payload.debufs,
      };
    }
    case 'add_question': {
      return {
        ...state,
        questions: [...state.questions, action.payload],
      };
    }
    case 'remove_question': {
      return {
        ...state,
        questions: state.questions.filter((_q, i) => i !== action.payload),
      };
    }
  }
  throw Error('Unknown action: ' + action.type);
}

function AddQuiz() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [initialState, setInitialState] = useState(true);

  const { mutate, isLoading, isError, isSuccess, error } = useAddQuiz();

  const [quizData, dispatch] = useReducer(reducer, {
    title: '',
    description: '',
    debufs: false,
    questions: [],
    createdBy: cookies.user,
  });

  const submitQuiz = () => {
    mutate({ quiz: quizData });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isSuccess) {
    return <Navigate to="/host" />;
  }

  return (
    <>
      <div className="form mx-auto w-fit">
        {quizData.questions.map((question, index) => (
          <div key={`question-${index}`} className="flex gap-2 font-bold">
            <span>{question.question}</span>
            <button
              className="border-2 border-black px-1"
              onClick={() =>
                dispatch({
                  type: 'remove_question',
                  payload: index,
                })
              }
            >
              Remove
            </button>
          </div>
        ))}
        {initialState ? (
          <InitialState setInitialState={setInitialState} dispatch={dispatch} />
        ) : (
          <AddQuestions dispatch={dispatch} />
        )}

        {quizData.questions.length > 0 ? (
          <button className="btn-form" onClick={submitQuiz}>
            Submit Quiz
          </button>
        ) : null}
      </div>
    </>
  );
}

export default AddQuiz;
