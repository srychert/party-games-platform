import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

function useNewGame(game) {
  const [gamedata, setGamedata] = useState({});
  const { api } = useAuth();
  useEffect(() => {
    api
      .post(`/games`, game)
      .then((res) => {
        setGamedata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return [gamedata, newGame];
}

export default useNewGame;
