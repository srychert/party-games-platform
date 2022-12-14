import React, { useState, useEffect } from 'react';
import { useAuth } from '../useAuth';
import handleError from '../handleError';

function useUser(id) {
  const [userData, setUserData] = useState({});
  const { api } = useAuth();
  const [hError] = handleError();

  useEffect(() => {
    api
      .get(`users/${id}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        hError(err);
      });
  }, [id]);

  return userData;
}

export default useUser;
