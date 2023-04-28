import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const SecureRoute = () => {
  const authState = JSON.parse(localStorage.getItem("user"));
  console.log("authState", authState);

  if (!authState) {
    return <Navigate to="/auth/login" replace={true} />;
  }

  return authState.role === 7777 ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" replace={true} />
  );
};

export default SecureRoute;
