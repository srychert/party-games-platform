import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
function PointsChart({ players }) {
  const [chartData, setChartData] = useState({
    labels: players.map((player) => player.nick),
    datasets: [
      {
        label: 'Wyniki',
        data: players.map((player) => player.points),
        backgroundColor: players.map(() => {
          return 'rgba(255, 99, 132, 0.2)';
        }),
        borderColor: players.map(() => {
          return 'rgba(255, 99, 132, 1)';
        }),
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: players.map((player) => player.nick),
      datasets: [
        {
          label: 'Wyniki',
          data: players.map((player) => player.points),
          backgroundColor: players.map(() => {
            return 'rgba(255, 99, 132, 0.2)';
          }),
          borderColor: players.map(() => {
            return 'rgba(255, 99, 132, 1)';
          }),
          borderWidth: 1,
        },
      ],
    });
  }, [players]);
  // tutaj bedzie chart.js z wykresami
  return (
    <div className="h-1/5 border-b-2 pb-2">
      <Bar
        data={chartData}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: 'Wyniki',
            },
          },
        }}
      />
    </div>
  );
}
export default PointsChart;

// {props.players.map((player, index) => {
//   if (player.nick === cookies.nick) {
//     return (
//       <div className="flex flex-col p-2" key={index}>
//         <div className="bg-sky-700 text-center" style={{ padding: player.points }}>
//           {player.points}
//         </div>
//         <div className="flex justify-center">{player.nick}</div>
//       </div>
//     );
//   } else {
//     return (
//       <div className="flex flex-col p-2" key={index}>
//         <div className="bg-sky-200 text-center" style={{ padding: player.points }}>
//           {player.points}
//         </div>
//         <div className="flex justify-center">{player.nick}</div>
//       </div>
//     );
//   }
// })}
