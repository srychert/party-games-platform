import { useEffect, useState } from 'react';

function Question({ question }) {
  const [count, setCount] = useState('5');

  // useEffect(() => {
  //   count > 0 && setTimeout(() => setCount(count - 1), 1000);
  // }, [count]);

  return (
    <div>
      {/* {count === 0 ? (
        <span className="text-8xl">{question.question}</span>
      ) : (
        <span className="text-8xl">{count}</span>
      )} */}
      <span className="text-8xl">{question}</span>
    </div>
  );
}

export default Question;
