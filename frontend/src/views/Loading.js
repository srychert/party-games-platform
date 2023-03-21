import React from 'react';

function Loading() {
  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="m-2 h-5 w-5 animate-spin rounded-full border-b-2 border-metal"></div>
      Loading...
    </div>
  );
}

export default Loading;
