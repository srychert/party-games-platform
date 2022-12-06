import { useContext, createContext, useMemo } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();

  const login = async ({ username, password }) => {
    // const res = await api.post(
    //   "/token",
    //   {},
    //   {
    //     auth: {
    //       username,
    //       password,
    //     },
    //   }
    // );

    // setCookie("token", res.data.token);
    // setCookie("user", res.data.user);

    // test code
    console.log(username, password);
    setCookie("token", "token");
    setCookie("user", username);
    navigate("/host");
  };

  const logout = () => {
    removeCookie("token");
    removeCookie("user");
    navigate("/login");
  };

  const setNick = (nick) => {
    setCookie("nick", nick);
  };
  const value = useMemo(
    () => ({
      cookies,
      login,
      logout,
      setNick,
    }),
    [cookies]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
};
