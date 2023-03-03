import React, { useReducer, useState } from 'react';
import InitialState from '../../components/AddGameForm/InitialState';
import AddQuestions from '../../components/AddGameForm/AddQuestions';
import { Navigate, useNavigate } from 'react-router-dom';
import Nav from '../../components/UserPanel/Nav';
import { useApi } from '../../context/ApiProvider';
import { useCookies } from 'react-cookie';
import { useAddGame } from '../../hooks/useAddGame';
import Loading from '../Loading';

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

function AddGame() {
  const { api } = useApi();
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const [initialState, setInitialState] = useState(true);

  const { mutate, isLoading, isError, isSuccess, error } = useAddGame();

  const [gameData, dispatch] = useReducer(reducer, {
    title: '',
    description: '',
    debufs: false,
    questions: [],
    createdBy: cookies.user,
  });

  const submitGame = () => {
    mutate({ game: gameData });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isSuccess) {
    return <Navigate to="/host" />;
  }

  return (
    <>
      <Nav />
      <div className="form mx-auto w-fit">
        <div>
          {gameData.questions.map((question, index) => (
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
        </div>
        {initialState ? (
          <InitialState setInitialState={setInitialState} dispatch={dispatch} />
        ) : (
          <AddQuestions dispatch={dispatch} />
        )}

        {gameData.questions.length > 0 ? (
          <button className="btn-form" onClick={submitGame}>
            Submit Game
          </button>
        ) : null}
      </div>
    </>
  );
}

export default AddGame;
