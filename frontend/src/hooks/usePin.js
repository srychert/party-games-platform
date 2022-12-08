import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

function usePin(id) {
  const [pin, setPin] = useState("");
  const { api } = useAuth();
  useEffect(() => {
    api
      .post(
        `/games/new/${id}`)
      .then((res) => {
        console.log(res);
        setPin(res.data.pin);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return pin;
}

export default usePin;
