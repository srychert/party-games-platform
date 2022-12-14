import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import handleError from './handleError';
import axios from 'axios';
import { Cookies } from 'react-cookie';

function useNewGame() {
  const [gamedata, setGamedata] = useState({});
  function newGame(game) {
    const cookies = new Cookies();
    // wywala blad ze hookow nie mozna uzywac inside hooks
    // const { api } = useAuth();
    const config = {
      headers: { Authorization: `Bearer ${cookies.get('token')}` },
    };
    axios
      .post(`http://localhost:8080/api/v1/games`, game, config)
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
