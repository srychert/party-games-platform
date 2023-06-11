import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Loading from '../../views/Loading';
import { useToken } from '../../hooks/useToken';

const ProtectRoutes = () => {
  const { isLoading, isError, data, error } = useToken();
  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  if (error?.response?.status === 401 || data?.status === 302) {
    if (location?.state?.loginSuccess !== true) {
      return <Navigate to="/login" replace />;
    }
    window.history.replaceState(
      { ...location?.state, loginSuccess: null },
      document.title
    );
    return <Outlet />;
  }

  if (isError) {
    console.error(error);

    return <span>Error: {error.message}</span>;
  }

  return <Outlet />;
};

export default ProtectRoutes;
