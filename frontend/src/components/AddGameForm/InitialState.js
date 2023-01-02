import { useState } from 'react';

function InitialState({ setInitialState, dispatch }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [debufs, setDebufs] = useState(false);

  function handleInitialState(event) {
    event.preventDefault();
    setInitialState(false);
    dispatch({
      type: 'add_game_info',
      payload: {
        title,
        description,
        debufs,
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
        />
      </div>

      <div className="flex flex-col p-2">
        <label>Game Description</label>
        <input
          type={'text'}
          placeholder={'Description'}
          onChange={(e) => setDescription(e.target.value)}
          required={true}
        />
      </div>

      <div className="p-2">
        <label>Debufs?</label>
        <input onChange={() => setDebufs(!debufs)} type={'checkbox'} />
      </div>

      <input className="btn-form" value={'Add Questions'} type={'submit'} />
    </form>
  );
}

export default InitialState;
