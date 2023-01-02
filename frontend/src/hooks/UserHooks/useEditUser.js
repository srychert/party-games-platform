import React, { useState, useEffect } from 'react';
import { useAuth } from '../useAuth';

export default function useEditUser(id, name, text) {
  const [userData, setUserData] = useState({});
  const { api } = useAuth();

  useEffect(() => {
    api
      .put(`users/${id}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // axios
    //   .put(
    //     `http://localhost:8080/api/v1/users/${id}`,
    //     name ? { userName: text } : { password: text }
    //   )
    //   .then((res) => {
    //     setUserData(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [id]);

  return userData;
}
