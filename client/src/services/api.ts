import axios from "axios";

// Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Interceptor
api.interceptors.request.use((config) => {
  // Make sure headers always exist
  config.headers = config.headers ?? {};

  // Add Authorization if token exists
  const token = localStorage.getItem("token");
  if (token) {
    // Type assertion ensures TS knows headers is a simple object
    (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
