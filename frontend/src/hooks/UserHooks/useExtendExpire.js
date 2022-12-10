import React, { useState, useEffect } from 'react';
import axios from 'axios';

function useExtendExpire(id) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios
      .patch(`http://localhost:8080/api/v1/users/${id}/expire`)
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
