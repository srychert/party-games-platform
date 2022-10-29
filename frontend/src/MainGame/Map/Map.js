import React, { useEffect } from "react";
import './map.css';


function Map() {
    // pozycje liczone od 0, ale grid od 1 (Uwaga!!)
    const [playersPosition, setPlayersPosition] = React.useState([
        {x:0, y:0},
        {x:5, y: 2}
    ]);
    function checkPlayerPos(x, y){
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
                        parseInt(y % 7 + 1),
                        parseInt(y / 7 + 1)
                        ) ? (
                        <div style={{color: 'red'}}>
                            <img alt="Mapa" className="map-img"/>
                            <img alt="Hero" className="hero-img"/>
                        </div>
                    ) : (
                        <div style={{color: 'green'}}> 
                            <img alt="Mapa"/>
                        </div>
                    )}
                    </div>
            ))}
        </div>
    );
    }

export default Map;