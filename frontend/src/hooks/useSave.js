import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import handleError from './handleError';

// zupełnie nie tak, ale to placeholder
function useSave(gameId, pin, round, players, id) {
  const [save, setSave] = useState(false);
  const { api } = useAuth();
  const saveGame = () => {
    api
      .post(`/games/${id}`, { pin, round, players })
      .then((res) => {
        setSave(true);
      })
      .catch((err) => {
        handleError(err);
      });
  };
  return { save, saveGame };
}

export default useSave;
