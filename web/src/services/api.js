import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  timeout: 10000,
});

api.interceptors.response.use(
  r => r,
  err => Promise.reject(new Error(err?.response?.data?.message || err.message))
);

export default api;
