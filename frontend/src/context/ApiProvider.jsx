import axios from 'axios';
import { useContext, createContext, useMemo } from 'react';
import { useCookies } from 'react-cookie';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies();

  const api = axios.create({
    baseURL: `${import.meta.env.API_URL}:${import.meta.env.API_PORT}/api/v1`,
  });

  api.interceptors.request.use(function (config) {
    config.headers.Authorization = null;
    const token = cookies.token;

    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
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
