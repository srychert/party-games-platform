import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import handleError from './handleError';

function useGame(id) {
  const [gameData, setGamesData] = useState({});
  const { api } = useAuth();
  useEffect(() => {
    api
      .get(`/games/${id}`)
      .then((res) => {
        setGamesData(res.data);
      })
      .catch((err) => {
        handleError(err);
      });
  }, []);
  return gameData;
}

export default useGame;
