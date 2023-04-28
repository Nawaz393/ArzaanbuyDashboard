import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Login } from "@/layouts";

import axios from "axios";
import { SecureRoute } from "./pages/auth/SecureRoute";
import React from "react";
function App() {
  axios.defaults.baseURL = "https://demo-s4hp.onrender.com";

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
