import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import handleError from './handleError';

function useGames() {
  const [gamesData, setGamesData] = useState([]);
  const { api } = useAuth();
  useEffect(() => {
    api
      .get('/games')
      .then((res) => {
        setGamesData(res.data);
      })
      .catch((err) => {
        handleError(err);
      });
  }, []);
  return gamesData;
}

export default useGames;
