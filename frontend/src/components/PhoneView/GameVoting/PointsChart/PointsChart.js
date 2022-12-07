import React from "react"
import { useAuth } from "../../../../hooks/useAuth"

function PointsChart(props){
    const {cookies} = useAuth();
    console.log(cookies);
    return (
        <div className="flex flex-row items-end border-b-2 border-sky-400 m-2 w-screen justify-center shadow-md">
            {props.players.map((player, index) => {
                if(player.nick === cookies.nick){
                    return (
                        <div className="p-2 flex flex-col" key={index}>
                            <div className="bg-sky-700 text-center" style={{padding: player.points}}>   
                                {player.points}                             
                            </div>
                            <div className="flex justify-center">
                                {player.nick}
                            </div>
                        </div>
                    )
                }else{
                    return (
                        <div className="p-2 flex flex-col" key={index}>
                            <div className="bg-sky-200 text-center" style={{padding: player.points}}>   
                                {player.points}                             
                            </div>
                            <div className="flex justify-center">
                                {player.nick}
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )
}
export default PointsChart
