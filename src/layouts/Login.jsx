import { Route,  Routes } from "react-router-dom";
import { SignIn } from "@/pages/auth";

export function Login() {
  return (
    <div className="relative min-h-screen w-full">
      <div className="container relative z-40 mx-auto p-4"></div>
      <Routes>
        <Route exact path="/login" element={<SignIn />} />
      </Routes>
      <div className="container absolute bottom-8 left-2/4 z-10 mx-auto -translate-x-2/4 text-white"></div>
    </div>
  );
}


Login.displayName = "/src/layout/Login.jsx";

export default Login;
