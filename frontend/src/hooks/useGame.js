import axios from "axios";
import { useEffect, useState } from "react";

function useGame(id) {
  const [gamedata, setGamedata] = useState({});
  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_DOMAIN}:8080/api/v1/games/${id}`)
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
