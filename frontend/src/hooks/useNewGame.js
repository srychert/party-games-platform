import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import handleError from './handleError';

function useNewGame(game) {
  const [gamedata, setGamedata] = useState({});
  const { api } = useAuth();
  useEffect(() => {
    api
      .post(`games`, game)
      .then((res) => {
        setGamedata(res.data);
      })
      .catch((err) => {
        handleError(err);
      });
  }, [game]);
  return gamedata;
}

export default useNewGame;
