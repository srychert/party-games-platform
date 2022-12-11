function AddABCDQuestion({ setCorrect, setA, setB, setC, setD }) {
  const buttonClass = 'flex flex-col justify-center items-center h-10 w-60 button';

  return (
    <div>
      <div className={'flex flex-col items-center justify-center'}>
        <div className={'grid grid-cols-2 gap-2'}>
          <input
            type={'text'}
            placeholder={'option A'}
            onChange={(e) => setA(e.target.value)}
            required={true}
          />
          <input
            type={'text'}
            placeholder={'option B'}
            onChange={(e) => setB(e.target.value)}
            required={true}
          />
          <input
            type={'text'}
            placeholder={'option C'}
            onChange={(e) => setC(e.target.value)}
            required={true}
          />
          <input
            type={'text'}
            placeholder={'option D'}
            onChange={(e) => setD(e.target.value)}
            required={true}
          />
        </div>
        <select onChange={(e) => setCorrect(e.target.value)} required={true}>
          <option value="">select correct</option>
          <option value={'1'}>A</option>
          <option value={'2'}>B</option>
          <option value={'3'}>C</option>
          <option value={'4'}>D</option>
        </select>
        <button className={buttonClass} type={'submit'}>
          Add question
        </button>
      </div>
    </div>
  );
}

export default AddABCDQuestion;
