import React from "react";
import { useNavigate } from "react-router-dom";

function Common() {
  const navigate = useNavigate();
  function handleHost() {
    navigate("/host");
  }
  function handleJoin() {
    navigate("/join");
  }
  return (
    <div className="flex h-screen flex-row items-center justify-center">
      <div className="card" onClick={() => handleHost()}>
        <div className="text-8xl ">Host</div>
      </div>
      <div className="card" onClick={() => handleJoin()}>
        <div className="text-8xl ">Gracz</div>
      </div>
    </div>
  );
}

export default Common;
