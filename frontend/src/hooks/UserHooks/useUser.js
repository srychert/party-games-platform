import React, { useState, useEffect } from 'react';
import axios from 'axios';

function useUser(id) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/users/${id}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return userData;
}

export default useUser;
