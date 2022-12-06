import api from "../services/api";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

function usePin(id) {
  const [pin, setPin] = useState("");
  const { cookies } = useAuth();
  useEffect(() => {
    api
      .post(
        `/games/new/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setPin(res.data.pin);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, cookies.token]);
  return pin;
}

export default usePin;
