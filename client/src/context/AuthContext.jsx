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
      const response = await registerRequest(data);
      await verifyToken();
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
    }
  };

  const login = async (user) => {
    try {
      const response = await loginRequest(user);
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
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
    }
  };

  const verifyToken = async () => {
    setLoading(true);
    try {
      // Asegúrate de tener configurada correctamente profileRequest para enviar el token
      const res = await profileRequest();

      // Si la petición es exitosa, actualiza el estado
      setIsAuthenticated(true);
      setUser({ username: res.data.username, email: res.data.email });
    } catch (error) {
      // Si el error tiene response, accedemos a la data de la respuesta
      const errorMessage = error.response ? error.response.data : error.message;
      console.error("Token Verification Failed:", errorMessage);

      setIsAuthenticated(false); // Marcar como no autenticado
      setUser(null);
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
