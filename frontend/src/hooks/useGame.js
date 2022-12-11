import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import handleError from './handleError';

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
        handleError(err);
      });
  }, [id]);
  return gamedata;
}

export default useGame;
