import { Navigate, Outlet } from 'react-router-dom';
import Loading from '../../views/Loading';
import { useToken } from '../../hooks/useToken';

const ProtectRoutes = () => {
  const { isLoading, isError, data, error } = useToken();

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isError) {
    if (error?.response?.status === 401) {
      return <Navigate to="/login" />;
    }

    return <span>Error: {error.message}</span>;
  }

  if (data === null) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectRoutes;
