function InputQuestion({ setCorrect }) {
  const buttonClass = 'flex flex-col justify-center items-center h-10 w-60 button';

  return (
    <div className={'flex flex-col items-center justify-center'}>
      <input
        className={'min-w-20 flex justify-center'}
        type={'text'}
        placeholder={'Correct answer'}
        onChange={(e) => setCorrect(e.target.value)}
        required={true}
      />
      <button className={buttonClass} type={'submit'}>
        Add question
      </button>
    </div>
  );
}

export default InputQuestion;
