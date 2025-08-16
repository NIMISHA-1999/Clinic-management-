import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:8000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    // Your Postman uses either Bearer or "Token token=<key>"
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
