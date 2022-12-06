import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

function usePin(id) {
  const [pin, setPin] = useState("");
  const { cookies } = useAuth();
  useEffect(() => {
    axios
      .post(
        `http://${process.env.REACT_APP_DOMAIN}:8080/api/v1/games/new/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )
      .then((res) => {
        setPin(res.data.pin);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, cookies.token]);
  return pin;
}

export default usePin;
