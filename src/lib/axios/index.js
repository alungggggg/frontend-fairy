import axios from "axios";
import { getCookies } from "cookies-next";

const fairyApi = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

fairyApi.interceptors.request.use((config) => {
  const { token } = getCookies("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token || ""}`;
  }
  return config;
});

fairyApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unautorize");
    }
    return Promise.reject(error);
  }
);

export default fairyApi;
