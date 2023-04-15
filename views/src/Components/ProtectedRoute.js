import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  isAuthenticated,
  children,
  adminRoute,
  isAdmin,
  redirect = "/",
  redirectAdmin = "/data",
}) => {
  if (!isAuthenticated) {
    return <Navigate to={redirect} />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;