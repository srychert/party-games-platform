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
    <div className={props.class}>
      {players.map((player, index) => {
        return <div key={index} className={"player"}></div>;
      })}
    </div>
  );
}

export default Tile;
