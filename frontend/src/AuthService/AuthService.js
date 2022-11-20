import axios from "axios";

function authService(login, password) {
  localStorage.setItem("user", "test", { path: "/" });
  // return axios
  //   .post("http://localhost:8080/login", {
  //     login: login,
  //     password: password,
  //   })
  //   .then((res) => {
  //     console.log(res);
  //     return res.data;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
}

export default authService;
