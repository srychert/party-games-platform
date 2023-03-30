import axios from 'axios';
import { useContext, createContext, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();

  const logout = () => {
    removeCookie('token');
    removeCookie('user');
    navigate('/login');
  };

  const setNick = (nick) => {
    setCookie('nick', nick, { path: '/' });
  };

  const removeNick = () => {
    removeCookie('nick');
  };

  const value = useMemo(
    () => ({
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
    throw new Error('useAuth must be used within a UserProvider');
  }
  return context;
};
