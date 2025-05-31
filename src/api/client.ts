import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  withCredentials: true, // ← send & receive cookies
  headers: { "Content-Type": "application/json" },
});

export default api;
