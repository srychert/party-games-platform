import React from "react";
import Tile from "./Tile/Tile";
import { tilesTypes } from "./Tile/tiles-types";

// Mapa dostanie w propsach dwie kolejne kafelki
function Map(props) {
  return (
    <div>
      Poziom 1
      <div className="flex flex-row items-center justify-center ">
        <Tile players={props.players} class={tilesTypes.DESERT} />
        <Tile players={[]} class={tilesTypes.FOREST} />
      </div>
    </div>
  );
}

export default Map;
