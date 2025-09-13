import { AxiosRequestConfig } from "axios";
import { SessionToken } from "../cookies";

export const axiosConfig: AxiosRequestConfig = {
  baseURL: "http://techtest.youapp.ai/",
  headers: {
    "x-access-token": `${SessionToken.get()?.access_token}`,
  },
};
