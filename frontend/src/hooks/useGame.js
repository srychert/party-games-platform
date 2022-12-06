import { useEffect, useState } from "react";
import api from "../services/api";
import useAuth from "./useAuth";

function useGame(id) {
  const [gamedata, setGamedata] = useState({});
  const { cookies } = useAuth();
  useEffect(() => {
    api
      .get(
        `/games/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )
      .then((res) => {
        setGamedata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, cookies.token]);
  return gamedata;
}

export default useGame;
