// // src/config/api.js
// import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_BACKEND_URL ;

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default api;

// src/config/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// ⬅️ हर request में token automatically भेजेगा
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
