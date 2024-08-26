import axios from "axios";
import router from "@/router";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 403) {
      router.replace({ name: "UnauthorizedError" });
    }
    return Promise.reject(error);
  },
);

export default instance;
