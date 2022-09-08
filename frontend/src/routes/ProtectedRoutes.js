import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  // localStorage.getItem("token");
  const user = { loggedIn: localStorage.getItem("token") ? true : false };
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};


export const AdminRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;