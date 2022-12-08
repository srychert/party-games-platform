import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';

function useGames() {
  const [gamesData, setGamesData] = useState([]);
  const { api } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    api
      .get('/games')
      .then((res) => {
        setGamesData(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401 || err.response.status === 403) {
          navigate('/login');
        }
      });
  }, []);
  return gamesData;
}

export default useGames;
