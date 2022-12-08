import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

function usePin(id) {
  const [pin, setPin] = useState("");
  const { api } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    api
      .post(
        `/games/new/${id}`)
      .then((res) => {
        console.log(res);
        setPin(res.data.pin);
      })
      .catch((err) => {
        if (err.response.status === 401 || err.response.status === 403) {
          navigate("/login");
        }
      });
  }, [id]);
  return pin;
}

export default usePin;
