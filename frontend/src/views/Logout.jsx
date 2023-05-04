import React from 'react';
import { useLogout } from '../hooks/useLogout';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Loading from './Loading';

function Logout() {
  const { mutate, isLoading, isError, isSuccess, error } = useLogout();

  useEffect(() => {
    mutate()
  }, [])

  if(isLoading) {
    return <Loading />
  }

  if(isSuccess) {
    return <Navigate to='/login' />
  }

  if(isError) {
    if(error?.response?.status === 401) return <Navigate to='/login' />

    return <div>{error.message}</div>;
  }

  return <div>Logout</div>;
}

export default Logout;
