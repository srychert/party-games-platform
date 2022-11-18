import axios from "axios";
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import "./login.css";

function Login() {
  const [cookies, setCookie] = useCookies(["user"]);
  const [passtype, setPasstype] = React.useState("password");

  function switchPasstype() {
    if (passtype === "password") {
      setPasstype("text");
    } else {
      setPasstype("password");
    }
  }
  let navigate = useNavigate();

  const HandleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.login.value, e.target.password.value);
    setCookie("user", e.target.login.value, { path: "/" });
    navigate("/host");
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
    <div className="login-page">
      <form onSubmit={(e) => HandleSubmit(e)} className="login-form">
        <div className="login">
          <label htmlFor="login">Login</label>
          <input type="text" name="login" id="login" autoComplete="off" />
        </div>
        <div className="password">
          <label htmlFor="password">Hasło</label>
          <input
            type={passtype}
            name="password"
            id="password"
            autoComplete="off"
          />
          <div className="switch">
            <input
              type="checkbox"
              onClick={() => switchPasstype()}
              className="checkbox"
            />{" "}
            Pokaż hasło
          </div>
        </div>
        <button type="submit">Zaloguj</button>
      </form>
    </div>
  );
}

export default Login;
