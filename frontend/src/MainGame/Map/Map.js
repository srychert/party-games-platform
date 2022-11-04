import React from "react";
import './map.css';


function Map() {
    // pozycje liczone od 0, ale grid od 1 (Uwaga!!)
    const [playersPosition, setPlayersPosition] = React.useState([
        {x:0, y:0, color: 'green'},
        {x:5, y: 2, color: 'red'},
        {x:0, y: 0, color: 'blue'},
    ]);
    function checkPlayerPos(x, y){
        const res =  playersPosition.filter(player => 
            player.x+1 === x && player.y+1 === y
        )
        return res.length !== 0 ? true : false;
    }
    // x = i % 7 + 1
    // y = i / 7 + 1
    

    // Zmienic src obrazków na pobieranie z bazy albo coś!!
    
    return (
        <div className="main-game-screen-map__content">
            <img src={require('./test-map.jpeg')} alt="map" style={{width: '90vw', height: '100vh', zIndex: -1}}/>
            {[...Array(49)].map((_, y) => (
                <div className="tile" key={y} id={y}>
                    {checkPlayerPos (
                        parseInt(y % 7 + 1),
                        parseInt(y / 7 + 1)
                        ) ? (
                        <div style={{color: 'red'}}>
                            <div>Player</div>
                        </div>
                    ) : (
                        <div style={{color: 'green'}}> 
                        </div>
                    )}
                    </div>
            ))}
        </div>
    );
    }

export default Map;