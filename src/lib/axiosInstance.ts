import axios from "axios";
import { requestInterceptor } from "./helpers";

const headers = {
  "content-type": "application/json",
};

export const baseURL = "http://localhost:4000/api/v1";

const instance = (token?: string) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers,
  });

  axiosInstance.interceptors.request.use(requestInterceptor(token));

  return axiosInstance;
};

export default instance;
