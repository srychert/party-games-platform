import { useState } from 'react';

function InitialState({ setInitialState, dispatch }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function handleInitialState(event) {
    event.preventDefault();
    setInitialState(false);
    dispatch({
      type: 'add_game_info',
      payload: {
        title,
        description,
        debufs: false,
      },
    });
  }

  return (
    <form onSubmit={handleInitialState}>
      <div className="flex flex-col p-2">
        <label>Title</label>
        <input
          type={'text'}
          placeholder={'Title'}
          onChange={(e) => setTitle(e.target.value)}
          required={true}
          className="form-input"
        />
      </div>

      <div className="flex flex-col p-2">
        <label>Game Description</label>
        <textarea
          type={'text'}
          placeholder={'Description'}
          onChange={(e) => setDescription(e.target.value)}
          required={true}
          className="form-input h-24"
        />
      </div>

      <input className="btn-form" value={'Add Questions'} type={'submit'} />
    </form>
  );
}

export default InitialState;
