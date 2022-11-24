import React from "react"
import Tile from "./Tile/Tile"

function Map(props) {
   return (
      <div className="flex flex-col justify-center items-center ">
         Poziom 1
         <Tile players={props.players} />
      </div>
   )
}

export default Map
