import axios from "axios";
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Login() {
  const [cookies, setCookie] = useCookies(["user"]);
  let navigate = useNavigate();

  const HandleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.login.value, e.target.password.value);
    setCookie("user", e.target.login.value, { path: "/" });
    navigate("/logged");
    // development lol
    // axios
    //   .post("http://localhost:8080/login", {
    //     login: e.target.login.value,
    //     password: e.target.password.value,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     // Zapisuje do ciasteczek dane zalogowanego użytkownika
    //     setCookie("user", res.data, { path: "/" });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <div className="login">
      <form onSubmit={(e) => HandleSubmit(e)}>
        <div className="login">
          <label htmlFor="login">Login</label>
          <input type="text" name="login" id="login" />
        </div>
        <div className="password">
          <label htmlFor="password">Hasło</label>
          <input type="text" name="password" id="password" />
        </div>
        <button type="submit">Zaloguj</button>
      </form>
    </div>
  );
}

export default Login;
