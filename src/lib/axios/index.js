import axios from "axios";
import { getCookies } from "cookies-next";

const fairyApi = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

fairyApi.interceptors.request.use((config) => {
  const { accessToken } = getCookies("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken || ""}`;
  }
  return config;
});

fairyApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // console.log("unautorize");
      throw error
      // return error
    }
    return Promise.reject(error);
  }
);

export default fairyApi;
