import React, { useState, useEffect } from 'react';
import { useAuth } from '../useAuth';

function useUser() {
  const [userData, setUserData] = useState({});
  const { api, cookies } = useAuth();

  useEffect(() => {
    api
      .get(`users/user-name/${cookies.user}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return userData;
}

export default useUser;
