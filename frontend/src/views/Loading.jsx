import React from 'react';

function Loading({ message }) {
  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="m-2 h-5 w-5 animate-spin rounded-full border-b-2 border-metal"></div>
      {message && <div className="m-2">{message}</div>}
    </div>
  );
}

export default Loading;
