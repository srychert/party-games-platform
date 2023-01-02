import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import handleError from './handleError';

function usePin(id) {
  const [pin, setPin] = useState('');
  const { api } = useAuth();
  useEffect(() => {
    api
      .post(`/games/new/${id}`)
      .then((res) => {
        setPin(res.data.pin);
      })
      .catch((err) => {
        handleError(err);
      });
  }, [id]);
  return pin;
}

export default usePin;
