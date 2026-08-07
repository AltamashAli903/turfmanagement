import axios from "axios";

// const SERVER_URL = "http://localhost:4500";
// const SERVER_URL = "http://10.105.207.211:4500";
const SERVER_URL = "http://192.168.0.107:4500";
// const SERVER_URL = "https://turf-backend-mtku.onrender.com";

export const IMAGE_URL = SERVER_URL;

const API = axios.create({
  baseURL: `${SERVER_URL}/api`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;