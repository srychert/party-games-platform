import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const ranking = Object.values(location?.state?.players || {})
    .sort((a, b) => b.gold - a.gold)
    .map((p) => p.id)
    .indexOf(location?.state?.player.id);

  if (ranking === -1) {
    return <Navigate to="/player/join" />;
  }

  return (
    <div className="mx-4 grid h-full place-content-center">
      <div>
        <h2 className="text-2xl font-semibold">
          Congratulations{' '}
          <span className="text-4xl text-emerald-600">
            {location?.state?.player?.nick}
          </span>
          , you placed:
        </h2>
        <h1 className="text-center text-8xl font-bold">{ranking + 1}</h1>
      </div>
      <button className="button mt-4" onClick={() => navigate('/player/join')}>
        Play again
      </button>
    </div>
  );
}

export default Result;
