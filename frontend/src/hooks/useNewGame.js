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
    // axios
    //   .post(`http://localhost:8080/api/v1/games`, game)
    //   .then((res) => {
    //     setGamedata(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [game]);
  return gamedata;
}

export default useNewGame;
