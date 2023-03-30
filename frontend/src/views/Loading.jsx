import React from 'react';

function Loading({ message }) {
  return (
    <div className="mx-auto flex items-baseline self-center">
      <div className="m-2 aspect-square h-10 animate-spin rounded-full border-b-2"></div>
      {message && <div className="m-2 text-xl">{message}</div>}
    </div>
  );
}

export default Loading;
