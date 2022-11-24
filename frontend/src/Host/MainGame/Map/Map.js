import React, { useEffect } from "react";
import Tile from "./Tile/Tile";

function Map(props) {
  const [players, setPlayers] = React.useState([{ color: "red" }]);
  useEffect(() => {
    setPlayers(props.players);
  }, [props.players]);

  return (
    <div>
      <Tile players={players} />
    </div>
  );
}

export default Map;
