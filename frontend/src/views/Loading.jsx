import React from 'react';

function Loading({ message }) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
      <div className="m-2 aspect-square h-10 animate-spin rounded-full border-b-4"></div>
      {message && <div className="m-2 text-xl">{message}</div>}
    </div>
  );
}

export default Loading;
