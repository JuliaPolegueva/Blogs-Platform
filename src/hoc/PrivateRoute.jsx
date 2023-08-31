import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const location = useLocation;
  const { isLogin } = useSelector(state => state.users);

  if (!isLogin) {
    return <Navigate to="/sign-in" state={{ from: location.pathname }} />;
  }
  return children;
};

export default PrivateRoute;
