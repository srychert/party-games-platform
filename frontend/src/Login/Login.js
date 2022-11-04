import axios from "axios";
import React from "react";

function Login() {
  const HandleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.login.value, e.target.password.value);
    axios
      .post("http://localhost:5000/login", {
        login: e.target.login.value,
        password: e.target.password.value,
      })
      .then((res) => {
        // Po zalogowaniu przekieruj na stronę główną
        // zmien stan na zalogowany
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
