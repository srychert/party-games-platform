import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import handleError from './handleError';
import axios from 'axios';
import { Cookies } from 'react-cookie';

function useNewGame() {
  const [gamedata, setGamedata] = useState({});
  // ale to juz dziala, wystarczylo dobrze zainicjalizowac api :)))))))))
  const { api } = useAuth();
  function newGame(game) {
    // wywala blad ze hookow nie mozna uzywac inside hooks
    // ta widze
    api
      .post(`/games`, game)
      .then((res) => {
        setGamedata(res.data);
      })
      .catch((err) => {
        handleError(err);
      });
  }
  return [gamedata, newGame];
}

export default useNewGame;
