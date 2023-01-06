import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

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
        console.log(err);
      });
  }, []);
  return gamesData;
}

export default useGames;
