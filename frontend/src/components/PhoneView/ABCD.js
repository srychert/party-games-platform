function ABCD({ answers, handleClick }) {
  return (
    <div>
      <button className="box bg-blue-700" id="1" onClick={() => handleClick(1)}>
        {answers[0]}
      </button>
      <button className="box bg-sand-700" id="2" onClick={() => handleClick(2)}>
        {answers[1]}
      </button>
      <button className="box bg-pastel-green-700" id="3" onClick={() => handleClick(3)}>
        {answers[2]}
      </button>
      <button className="box bg-froly-700" id="4" onClick={() => handleClick(4)}>
        {answers[3]}
      </button>
    </div>
  );
}

export default ABCD;
