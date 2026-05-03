import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:4500/api"
     baseURL: "https://turf-backend-mtku.onrender.com/api"
});

API.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
