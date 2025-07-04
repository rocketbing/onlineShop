import axios from "axios";
import { useUserStore } from "./user";
import { ElNotification } from "element-plus";
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});

request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    if (
      config.method.toLowerCase() !== "get" &&
      !config.headers["Content-Type"]
    ) {
      switch (config.contentType) {
        case "form":
          config.headers["Content-Type"] = "application/x-www-form-urlencoded";
          break;
        case "file":
          config.headers["Content-Type"] = "multipart/form-data";
          break;
        case "text":
          config.headers["Content-Type"] = "text/plain";
          break;
        case "html":
          config.headers["Content-Type"] = "text/html";
          break;
        default:
          config.headers["Content-Type"] = "application/json";
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
request.interceptors.response.use(
  (response) => {
    if (response.status == 200) {
      return response.data || response;
    } else {
      ElNotification({
        type: "error",
        message: response.data?.message || "Unknown error",
      });
      return Promise.reject(new Error(response.data.message || "Error"));
    }
  },
  (error) => {
    let status = error.response?.status;
    let errorMessage = error.response?.data?.message || "Request Failed";
    switch (status) {
      case 401:
        localStorage.removeItem("token");
        sessionStorage.clear();
        if (typeof window !== "undefined") {
          window.location.href = "./login";
        }
        break;
      case 400:
        errorMessage = `Bad Request: ${errorMessage}`;
        break;
      case 404:
        errorMessage = `Not Found: ${errorMessage}`;
        break;
      case 500:
        errorMessage = `Internal Server Error: ${errorMessage}`;
        break;
    }
    console.log(errorMessage);
    ElNotification({
      type: "error",
      message: errorMessage,
    });
    return Promise.reject(new Error(errorMessage));
  }
);

export const req = (url, method, data = {}, config = {}) => {
  method = method.toLowerCase();
  switch (method) {
    case "get":
      return request.get(url, config);
    case "post":
      return request.post(url, data, config);
    case "put":
      return request.put(url, data, config);
    case "delete":
      return request.delete(url, config);
    default:
      console.error(method);
      return Promise.reject("Unsupported method");
  }
};
