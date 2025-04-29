import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  withCredentials: true, // NECESARIO para enviar y recibir cookies
  headers: { "Content-Type": "application/json" },
});

export default api;
