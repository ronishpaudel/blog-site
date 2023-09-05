import { authStore } from "@/store/authStore";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "@/store/storage";
import axios, { AxiosError, AxiosResponse } from "axios";

export const API = axios.create({
  baseURL: "http://localhost:3007",
});

// Request interceptor
API.interceptors.request.use(
  async (axiosConfig) => {
    console.log("Api Call", axiosConfig.url);
    const token = await getItemFromLocalStorage("auth");
    if (token && axiosConfig.headers) {
      axiosConfig.headers.Authorization = `${token}`;
    }
    return axiosConfig;
  },
  (error: AxiosError) => Promise.reject(error)
);

//response interceptor
API.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    if (error?.response?.data?.error?.status?.code === 401) {
      typeof window !== "undefined" && removeItemFromLocalStorage("auth");
      authStore.setDbUser(null);
      authStore.setLogOut();
    }

    return Promise.reject({
      message: "Error occured",
      ...error?.response?.data,
    });
  }
);
