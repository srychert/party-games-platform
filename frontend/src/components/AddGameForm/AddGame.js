import React, { useReducer, useState } from 'react';
import InitialState from './InitialState';
import AddQuestions from './AddQuestions';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import UPanelNav from '../UserPanel/UPanelNav';

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
  const { api, cookies } = useAuth();
  const navigate = useNavigate();
  const [initialState, setInitialState] = useState(true);

  const [gameData, dispatch] = useReducer(reducer, {
    title: '',
    description: '',
    debufs: false,
    questions: [],
    createdBy: cookies.user,
  });

  const submitGame = () => {
    console.log('nowa gra', gameData);
    api
      .post(`/games`, gameData)
      .then((_res) => {
        navigate('/profile');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <UPanelNav />
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
