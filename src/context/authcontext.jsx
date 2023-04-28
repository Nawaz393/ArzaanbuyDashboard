import React, { createContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const initialState = {
  token: null,
  name: null,
  role: null,
  email: null,
  id: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        token: action.payload.token,
        name: action.payload.name,
        role: action.payload.role,
        email: action.payload.email,
        id: action.payload.id,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authState, dispatch] = useReducer(authReducer, initialState);

  // Check if auth data is present in local storage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({
        type: "LOGIN",
        payload: {
          token: user.token,
          name: user.name,
          role: user.role,
          email: user.email,
          id: user.id,
        },
      });
    }
  }, []);

  const login = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({
      type: "LOGIN",
      payload: {
        token: user.token,
        name: user.name,
        role: user.role,
        email: user.email,
        id: user.id,
      },
    });
    navigate("/dashboard/home");
  };

  const logout = () => {
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
    navigate("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
