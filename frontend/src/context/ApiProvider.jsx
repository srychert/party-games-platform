import axios from 'axios';
import { useContext, createContext, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();

  const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    headers: {
      Authorization: `Bearer ${cookies.token}`,
    },
  });

  api.interceptors.request.use(function (config) {
    const token = cookies.token;

    api.defaults.headers.common['Authorization'] = 'Bearer ' + token;

    if (token) {
      api.defaults.headers.common['Authorization'] = token;
    } else {
      api.defaults.headers.common['Authorization'] = null;
      //   navigate('/login');
    }

    return config;
  });

  // Response interceptor for API calls
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;

      if (error?.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        // navigate('/login');
      }
      return Promise.reject(error);
    }
  );

  const value = useMemo(
    () => ({
      api,
    }),
    [cookies]
  );

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within a ApiContext');
  }
  return context;
};
