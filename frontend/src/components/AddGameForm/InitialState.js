import { useState } from 'react';

function InitialState({ setInitialState, setIStateData }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [debufs, setDebufs] = useState(false);

  function handleInitialState(event) {
    event.preventDefault();
    setIStateData({
      title: name,
      description: description,
      debufs: debufs,
    });
    setInitialState(false);
  }

  const buttonClass = 'flex flex-col justify-center items-center h-10 w-60 button';

  return (
    <div className={'flex min-h-screen items-center justify-center align-middle'}>
      <form onSubmit={handleInitialState} className="form">
        <div className="flex flex-col p-2">
          <label>Game Name</label>
          <input
            type={'text'}
            placeholder={'Name'}
            onChange={(e) => setName(e.target.value)}
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
        <div>
          <label>Debufs?</label>
          <input onChange={() => setDebufs(!debufs)} type={'checkbox'} />
        </div>
        <input className={buttonClass} value={'Make questions'} type={'submit'} />
      </form>
    </div>
  );
}

export default InitialState;
