import React from "react";
import { useEffect } from "react";
import { tilesTypes } from "./tiles-types";

function Tile(props) {
  const [players, setPlayers] = React.useState([]);
  useEffect(() => {
    console.log(props.players);
    setPlayers(props.players);
  }, [props.players]);
  return (
    <div className="">
      {players.map((player, index) => {
        return (
          <div style={{ backgroundColor: player.color }} key={index}>
            X
          </div>
        );
      })}
    </div>
  );
}

export default Tile;
