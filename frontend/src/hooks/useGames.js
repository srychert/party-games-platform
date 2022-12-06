import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

function useGames() {
  const [gamesData, setGamesData] = useState([]);
  const { cookies } = useAuth();
  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_DOMAIN}:8080/api/v1/games`,
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )
      .then((res) => {
        setGamesData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cookies.token]);
  return gamesData;
}

export default useGames;
