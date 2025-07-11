import axios from "axios";
import { refreshRequest } from "./auth.api";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Send cookies with requests
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshRequest();
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);
export default api;
