import React, { useState, useEffect } from 'react';
import { useAuth } from '../useAuth';
import handleError from '../handleError';

function useUser() {
  const [userData, setUserData] = useState({});
  const { api, cookies } = useAuth();
  const [hError] = handleError();

  useEffect(() => {
    api
      .get(`users/user-name/${cookies.user}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        hError(err);
      });
  }, []);

  return userData;
}

export default useUser;
