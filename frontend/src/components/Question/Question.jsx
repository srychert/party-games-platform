import { useEffect, useState } from 'react';

function Question({ question }) {
  const [count, setCount] = useState('5');

  return (
    <div>
      <span className="text-8xl">{question}</span>
    </div>
  );
}

export default Question;
