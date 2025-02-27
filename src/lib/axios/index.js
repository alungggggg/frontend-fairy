import axios from "axios";
import { getCookies } from "cookies-next";

const fairyApi = axios.create({
  baseURL: import.meta.env.VITE_API_DEV,
  headers: {
    "Content-Type": "application/json",
    // "Accept" : "application/json",
  },
});

fairyApi.interceptors.request.use((config) => {
  const { accessToken } = getCookies("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken.split("%7C")[0]+"|"+accessToken.split("%7C")[1] || ""}`;
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
