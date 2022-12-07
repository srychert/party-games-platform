import { useContext, createContext, useMemo } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();

  const login = ({ username, password }) => {
    api.post("/token", {}, {
      auth: {
        username,
        password,
        },
        }).then((res) => {
          setCookie("token", res.data);
          setCookie("user", username);
          navigate("/host");
        }).catch((err) => {
          console.log(err);
        })
  };

  const logout = () => {
    removeCookie("token");
    removeCookie("user");
    navigate("/login");
  };

  const setNick = (nick) => {
    setCookie("nick", nick);
  };

  const removeNick = () => {
    removeCookie("nick");
  };
  const value = useMemo(
    () => ({
      cookies,
      login,
      logout,
      setNick,
      removeNick,
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
