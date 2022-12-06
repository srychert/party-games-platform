import { useEffect, useState } from "react";
import api from "../services/api";

function useGame(id) {
  const [gamedata, setGamedata] = useState({});
  useEffect(() => {
    api
      .get(`/games/${id}`)
      .then((res) => {
        setGamedata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return gamedata;
}

export default useGame;
