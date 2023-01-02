function TF({ answers, handleClick }) {
  return (
    <div>
      <button className="box bg-blue-700" id="1" onClick={() => handleClick(1)}>
        {answers[0]}
      </button>
      <button className="box bg-sand-700" id="2" onClick={() => handleClick(2)}>
        {answers[1]}
      </button>
    </div>
  );
}

export default TF;
