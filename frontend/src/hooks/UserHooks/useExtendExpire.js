import React, { useState, useEffect } from 'react';
import { useAuth } from '../useAuth';

function useExtendExpire(id) {
  const [userData, setUserData] = useState({});
  const { api } = useAuth();

  useEffect(() => {
    api
      .patch(`users/${id}/expire`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return userData;
}

export default useExtendExpire;
