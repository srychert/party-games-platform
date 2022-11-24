import axios from "axios";
import { useEffect, useState } from "react";

function usePin(id) {
  const [pin, setPin] = useState("");
  useEffect(() => {
    axios
      .post(
        `http://${process.env.REACT_APP_DOMAIN}:8080/api/v1/games/new/${id}`
      )
      .then((res) => {
        setPin(res.data.pin);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return pin;
}

export default usePin;
