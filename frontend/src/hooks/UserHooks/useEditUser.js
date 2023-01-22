import React, { useState, useEffect } from 'react';
import { useAuth } from '../useAuth';

export default function useEditUser(name, text) {
  const [userData, setUserData] = useState({});
  const { api, cookies } = useAuth();

  useEffect(() => {
    api
      .put(`users/${cookies.userId}`, {})
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return userData;
}
