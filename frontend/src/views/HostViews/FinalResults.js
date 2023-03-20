import React from 'react';
import { useLocation } from 'react-router-dom';
import Back from '../../components/Back/Back';
import PointsChart from '../../components/PointsChart/PointsChart';

function FinalResults() {
  const location = useLocation();

  return (
    <div className="flex w-full flex-col">
      <Back to="/host" />
      <h1 className="self-center">Final Results</h1>
      <div className="flex flex-col items-center">
        <div className="w-1/2">
          <PointsChart players={location?.state?.players || []} />
        </div>
      </div>
    </div>
  );
}

export default FinalResults;
