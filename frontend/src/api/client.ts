import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;
// Create Axios instance

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "applications/json",
  },
});

export default api;
