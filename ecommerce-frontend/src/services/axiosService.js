import axios from "axios";
import { REFRESH_TOKEN_URL } from "../constants/authenticationContants";
const doAxios = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

doAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const response = error?.response;
    const url = response?.config?.url;
    if (url.indexOf("/auth/login") >= 0 || url.indexOf("/auth/refresh-token") >= 0) {
      return error.response;
    }
    if (response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await doAxios.post(REFRESH_TOKEN_URL);
        return doAxios(originalRequest);
      } catch (error) {
        console.log(error);
      }
    }
    return Promise.reject(error);
  }
);
export default doAxios;
