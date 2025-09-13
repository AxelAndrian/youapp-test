import axios, { AxiosError } from "axios";
import { axiosConfig } from "./config";
import { SessionToken } from "../cookies";

export const api = axios.create(axiosConfig);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const originalRequest = error.config;

    const isUnauthorized =
      error.response?.status === 401 &&
      (error.response?.data as { error: string })?.error === "Unauthorized";

    const isLoginRequest = originalRequest?.url?.includes("/login");

    if (isUnauthorized && !isLoginRequest) {
      SessionToken.remove();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
