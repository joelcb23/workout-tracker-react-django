import { createContext, useContext, useState, useEffect } from "react";
import {
  loginRequest,
  logoutRequest,
  profileRequest,
  registerRequest,
} from "../api/auth.api";

// Crear el contexto
export const AuthContext = createContext();

// Hook personalizado para acceder al contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const signup = async (data) => {
    try {
      await registerRequest(data);
      await verifyToken();
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
    }
  };

  const login = async (user) => {
    try {
      await loginRequest(user);
      await verifyToken();
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("isAuthenticated");
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
    }
  };

  const verifyToken = async () => {
    setLoading(true);
    try {
      // Request to verify token
      const res = await profileRequest();

      // If the token is valid, set isAuthenticated to true
      setIsAuthenticated(true);
      setUser({ username: res.data.username, email: res.data.email });
      localStorage.setItem("isAuthenticated", "true");
    } catch (error) {
      // If the token is invalid, set isAuthenticated to false
      const errorMessage = error.response ? error.response.data : error.message;
      console.error("Token Verification Failed:", errorMessage);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("isAuthenticated");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};
