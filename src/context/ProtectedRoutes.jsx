import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Loader from '../components/Loader';

const ProtectedRoutes = () => {
  const { isUserAuthenticated, loading } = useContext(AuthContext);
  const location = useLocation();
  console.log("loadstate", loading)

  if (loading) {
    return <Loader/>; // Show a loading state while checking auth
  }

  return isUserAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};


export default ProtectedRoutes;
