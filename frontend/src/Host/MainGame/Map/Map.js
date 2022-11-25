import React from "react";
import Tile from "./Tile/Tile";
import { tilesTypes } from "./Tile/tiles-types";

// Mapa dostanie w propsach dwie kolejne kafelki
function Map(props) {
  return (
    <div>
      Poziom 1
      <div className="relative flex flex-row">
        <Tile class={tilesTypes.DESERT} />
        <Tile class={tilesTypes.FOREST} />
        <div className="absolute right-1/2 top-1/2 flex h-1/4 w-1/4 translate-x-[-50%] translate-y-[-50%] flex-row flex-wrap">
          <div className="player">P</div>
          <div className="player delay-75">P</div>
          <div className="player delay-100">P</div>
          <div className="player ">P</div>
          <div className="player ">P</div>
          <div className="player ">P</div>
        </div>
      </div>
    </div>
  );
}

export default Map;
