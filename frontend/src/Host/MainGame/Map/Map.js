import React, { useEffect } from "react";
import "./map.css";
import Tile from "./Tile/Tile";

function Map(props) {
  const [players, setPlayers] = React.useState([{ color: "red" }]);
  useEffect(() => {
    setPlayers(props.players);
  }, [props.players]);

  return (
    <div className="main-game-screen-map__content">
      <Tile players={players} />
    </div>
  );
}

export default Map;
