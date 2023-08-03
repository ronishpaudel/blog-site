import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:3001",
});

API.interceptors.request.use(
  (axiosConfig) => {
    const token = localStorage.getItem("jwtToken");
    if (token && axiosConfig.headers) {
      axiosConfig.headers["Authorization"] = `${token}`;
    }
    return axiosConfig;
  },
  (error) => Promise.reject(error)
);
