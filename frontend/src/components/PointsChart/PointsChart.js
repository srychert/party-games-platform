import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function PointsChart({ players }) {
  console.log(players);

  const chartData = {
    labels: players.map((player) => player.nick),
    datasets: [
      {
        label: 'Score',
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
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Scores',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              callback: function (value) {
                if (Number.isInteger(value)) {
                  return value;
                }
              },
              stepSize: 1,
            },
          },
        ],
      },
    },
  };

  return <Bar options={options} data={chartData} />;
}

export default PointsChart;
