import axios from "axios";
import { refreshRequest } from "./auth.api";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true, // Send cookies with requests
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isRefreshUrl = originalRequest.url.includes("/auth/token/refresh/");
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !isRefreshUrl
    ) {
      originalRequest._retry = true;
      const isLoggedIn = localStorage.getItem("isAuthenticated") === "true";
      if (!isLoggedIn) {
        console.warn("No refresh token found.");
        return Promise.reject(error);
      }

      try {
        await refreshRequest();
        return api(originalRequest);
      } catch (refreshError) {
        console.warn("Refresh failed. Redirecting to login...");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export default api;
