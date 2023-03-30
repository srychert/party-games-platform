function TF({ answers, handleClick }) {
  return (
    <div className="m-1 grid w-full grid-cols-2 gap-2">
      <button className="box bg-blue-700" id="1" onClick={() => handleClick(0)}>
        {answers[0]}
      </button>
      <button className="box bg-sand-700" id="2" onClick={() => handleClick(1)}>
        {answers[1]}
      </button>
    </div>
  );
}

export default TF;
