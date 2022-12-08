import React from 'react';
import { useNavigate } from 'react-router-dom';

function Common() {
  const navigate = useNavigate();
  function handleHost() {
    navigate('/host');
  }
  function handleJoin() {
    navigate('/join');
  }
  return (
    <div className="gradient flex h-screen flex-row items-center justify-center p-10">
      <div className="card" onClick={() => handleHost()}>
        <div className="sm: text-8xl text-5xl">Host</div>
      </div>
      <div className="card" onClick={() => handleJoin()}>
        <div className="sm: text-8xl text-5xl ">Gracz</div>
      </div>
    </div>
  );
}

export default Common;
