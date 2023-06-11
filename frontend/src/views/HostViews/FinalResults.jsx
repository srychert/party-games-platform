import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PointsChart from '../../components/PointsChart/PointsChart';

function FinalResults() {
  const location = useLocation();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Wyniki',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const players = location?.state?.players ?? [];
    console.log(players);
    setChartData({
      labels: players.map((player) => player.nick),
      datasets: [
        {
          label: 'Wyniki',
          data: players.map((player) => player?.points || 0),
          backgroundColor: players.map(() => 'rgba(54, 162, 235, 0.2)'),
          borderColor: players.map(() => 'rgba(54, 162, 235, 1)'),
          borderWidth: 1,
        },
      ],
    });
  }, [location.state?.players]);
  return (
    <div className="flex flex-col items-center">
      <h1 className="self-center">Final Results</h1>
      <div className="w-1/2">
        <PointsChart chartData={chartData} />
      </div>
    </div>
  );
}

export default FinalResults;
