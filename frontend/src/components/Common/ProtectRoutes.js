import { useAuth } from '../../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectRoutes = () => {
  const { cookies } = useAuth();

  return cookies.token ? <Outlet /> : <Navigate to="/login" exact />;
};
