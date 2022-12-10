import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';

function useGame(id) {
  const [gamedata, setGamedata] = useState({});
  const { api } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    api
      .get(`/games/${id}`)
      .then((res) => {
        setGamedata(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401 || err.response.status === 403) {
          navigate('/login');
        }
      });
  }, [id]);
  return gamedata;
}

export default useGame;
