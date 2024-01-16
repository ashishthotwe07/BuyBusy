import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './Contexts/AuthContext';

const PrivateRoute = ({ element: Element, ...props }) => {
  const { currentUser } = useAuth();
  console.log(currentUser)

  return (
    <Route
      {...props}
      element={currentUser ? <Element /> : <Navigate to="/signin" replace />}
    />
  );
};

export default PrivateRoute;
