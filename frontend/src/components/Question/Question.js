import { useEffect, useState } from 'react';

function Question(props) {
  const [count, setCount] = useState('5');
  useEffect(() => {
    count > 0 && setTimeout(() => setCount(count - 1), 1000);
  }, [count]);
  return (
    <div>
      {count === 0 ? (
        <span className="text-8xl">{props.question.question}</span>
      ) : (
        <span className="text-8xl">{count}</span>
      )}
    </div>
  );
}

export default Question;
