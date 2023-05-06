import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PointsChart from '../../components/PointsChart/PointsChart';

function FinalResults() {
  const location = useLocation();
  const [chartData, setChartData] = useState({
    labels: location.state.players.map((player) => player.nick),
    datasets: [
      {
        label: 'Wyniki',
        data: location.state.players.map((player) => player.points),
        backgroundColor: location.state.players.map(() => 'rgba(54, 162, 235, 0.2)'),
        borderColor: location.state.players.map(() => 'rgba(54, 162, 235, 1)'),
        borderWidth: 1,
      },
    ],
  });

  console.log(chartData);

  useEffect(() => {
    setChartData({
      labels: location.state.players.map((player) => player.nick),
      datasets: [
        {
          label: 'Wyniki',
          data: location.state.players.map((player) => player.points),
          backgroundColor: location.state.players.map(() => 'rgba(54, 162, 235, 0.2)'),
          borderColor: location.state.players.map(() => 'rgba(54, 162, 235, 1)'),
          borderWidth: 1,
        },
      ],
    });
  }, [location.state.players]);

  return (
    <div className="flex w-full flex-col">
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
