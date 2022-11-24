import axios from "axios";
import { useEffect, useState } from "react";

function useGames() {
  const [gamesData, setGamesData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_DOMAIN}:8080/api/v1/games`)
      .then((res) => {
        console.log(res.data);
        setGamesData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return gamesData;
}

export default useGames;
