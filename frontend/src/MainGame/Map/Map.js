import React, { useEffect } from "react";
import './map.css';


function Map() {
    const [playersPosition, setPlayersPosition] = React.useState([
        {x:0, y:0}
    ]);
    function checkPlayerPos(x, y){
        console.log(x, y)
        const res =  playersPosition.filter(player => 
            player.x+1 === x && player.y+1 === y
        )
        return res.length !== 0 ? true : false;
    }
    // x = i % 7 + 1
    // y = i / 7 + 1
    return (
        <div className="main-game-screen-map__content">
            {[...Array(49)].map((_, y) => (
                <div className="tile" key={y} id={y}>
                    {checkPlayerPos (
                        y % 7 + 1,
                        y / 7 + 1
                        ) ? (
                        <div style={{color: 'red'}}>
                            Mapa z graczem
                        </div>
                    ) : (
                        <div style={{color: 'green'}}> 
                            Mapa bez gracza
                        </div>
                    )}
                    </div>
            ))}
        </div>
    );
    }

export default Map;