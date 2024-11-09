import { AxiosRequestConfig } from "axios";
import { api } from "../api";

async function checkAccessTicket(token: string, config: AxiosRequestConfig = {}) {
  const response = await api.post("/check/access-ticket", { token }, config);
  return await response.data;
}

export { checkAccessTicket };
