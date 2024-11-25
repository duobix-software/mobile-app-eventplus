import { AxiosRequestConfig } from "axios";
import { api } from "../api";

const baseURL = `${process.env.EXPO_PUBLIC_BASE_URL}${process.env.EXPO_PUBLIC_ADMIN_API_URL}`;

console.log(baseURL);

async function checkAccessTicket(token: string, config: AxiosRequestConfig = {
  baseURL
}) {
  const response = await api.post("/check/access-ticket", { token }, config);
  return await response.data;
}

export { checkAccessTicket };
