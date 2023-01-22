import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

// zupełnie nie tak, ale to placeholder
// useEffect?!?!?!?
function useSave(gameId, pin, round, players, id) {
  const [save, setSave] = useState(false);
  const { api } = useAuth();
  useEffect(() => {
    api
      .post(`/games/${id}`, { pin, round, players })
      .then((res) => {
        setSave(true);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return save;
}

export default useSave;
