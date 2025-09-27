// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // backend URL
  withCredentials: true, // if using cookies (optional)
});

// Add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
