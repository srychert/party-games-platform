function ABCD({ answers, handleClick }) {
  return (
    <div className="m-1 grid w-full grid-cols-2 gap-2">
      <button className="answerBox bg-blue" id="1" onClick={() => handleClick(0)}>
        {answers[0]}
      </button>
      <button className="answerBox bg-sand" id="2" onClick={() => handleClick(1)}>
        {answers[1]}
      </button>
      <button className="answerBox bg-green" id="3" onClick={() => handleClick(2)}>
        {answers[2]}
      </button>
      <button className="answerBox bg-froly" id="4" onClick={() => handleClick(3)}>
        {answers[3]}
      </button>
    </div>
  );
}

export default ABCD;
