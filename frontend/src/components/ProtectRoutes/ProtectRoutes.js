import { useAuth } from '../../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';

const ProtectRoutes = () => {
  const { api } = useAuth();
  const [loading, setLoading] = useState(true);
  const [tokenValid, setTokenValid] = useState('');

  useEffect(() => {
    const checkToken = async () => {
      api
        .get('token')
        .then((r) => {
          setTokenValid(r.data);
          setLoading(false);
        })
        .catch((err) => {
          setTokenValid('');
          setLoading(false);
        });
    };

    checkToken();
  }, []);

  if (loading) {
    return <Loading></Loading>;
  }

  return tokenValid !== '' ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectRoutes;
