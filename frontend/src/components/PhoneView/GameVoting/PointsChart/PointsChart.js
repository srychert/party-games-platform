import React from 'react';
import { useAuth } from '../../../../hooks/useAuth';

function PointsChart(props) {
  const { cookies } = useAuth();
  console.log(cookies);
  return (
    <div className="m-2 flex w-screen flex-row items-end justify-center border-b-2 border-sky-400 shadow-md">
      {props.players.map((player, index) => {
        if (player.nick === cookies.nick) {
          return (
            <div className="flex flex-col p-2" key={index}>
              <div className="bg-sky-700 text-center" style={{ padding: player.points }}>
                {player.points}
              </div>
              <div className="flex justify-center">{player.nick}</div>
            </div>
          );
        } else {
          return (
            <div className="flex flex-col p-2" key={index}>
              <div className="bg-sky-200 text-center" style={{ padding: player.points }}>
                {player.points}
              </div>
              <div className="flex justify-center">{player.nick}</div>
            </div>
          );
        }
      })}
    </div>
  );
}
export default PointsChart;
