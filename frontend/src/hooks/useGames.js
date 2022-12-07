import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import api from "../services/api";

function useGames() {
  const [gamesData, setGamesData] = useState([]);
  const { cookies } = useAuth();
  useEffect(() => {
    console.log(cookies.token)
    api
      .get(`/games`, {}, {
        headers: {
          'Authorization': 'Bearer' + cookies.token,
        },
      })
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
