import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Login } from "@/layouts";
import { useContext } from "react";
import { AuthContext } from "./context/authcontext";

import axios from "axios";
import { SecureRoute } from "./pages/auth/SecureRoute";
import React from "react";
function App() {
  const { authState } = useContext(AuthContext);
  axios.defaults.baseURL = "https://demo-s4hp.onrender.com";
  console.log(authState.token)
  const token = JSON.parse(localStorage.getItem("user"))?.token ?? "";
  axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${authState?.token || token}`;
    return config;
  });

  return (
    <Routes>
      <Route element={<SecureRoute />}>
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Route>
      <Route path="/auth/*" element={<Login />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
