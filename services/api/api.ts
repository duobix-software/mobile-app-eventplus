import axios from "axios";
import { useUrlTemplateInterceptor } from "axios-url-template";

const baseURL = `${process.env.EXPO_PUBLIC_BASE_URL}${process.env.EXPO_PUBLIC_API_URL}`;

const api = axios.create({
  baseURL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    "Public-Key": process.env.EXPO_PUBLIC_API_KEY,
  },
  withCredentials: true,
});

useUrlTemplateInterceptor(api);

export { api };
