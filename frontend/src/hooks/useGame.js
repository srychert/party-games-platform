import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

function useGame(id) {
  const [gamedata, setGamedata] = useState({});
  const { api } = useAuth();
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
