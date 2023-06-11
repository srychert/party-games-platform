import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PointsChart from '../../components/PointsChart/PointsChart';

function GameFinalResults() {
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
    const players = location?.state?.players ?? {};
    console.log(players);
    const playersArray = Object.values(players);
    setChartData({
      labels: playersArray.map((player) => player.nick),
      datasets: [
        {
          label: 'Wyniki',
          data: playersArray.map((player) => player?.gold || 0),
          backgroundColor: playersArray.map(() => 'rgba(54, 162, 235, 0.2)'),
          borderColor: playersArray.map(() => 'rgba(54, 162, 235, 1)'),
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

export default GameFinalResults;
