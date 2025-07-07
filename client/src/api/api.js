import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true, // NECESARIO para enviar y recibir cookies
  headers: { "Content-Type": "application/json" },
});

export default api;
