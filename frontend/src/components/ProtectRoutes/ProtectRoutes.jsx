import { Navigate, Outlet } from 'react-router-dom';
import Loading from '../../views/Loading';
import { useToken } from '../../hooks/useToken';

const ProtectRoutes = () => {
  const { isLoading, isError, data, error } = useToken();

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isError) {
    console.error(error);

    return <span>Error: {error.message}</span>;
  }

  if (data.status === 302) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectRoutes;
