import { AxiosRequestConfig } from "axios";
import { api } from "./api";

async function getTicket(config: AxiosRequestConfig = {}) {
  const response = await api.get(
    "/orders/{order}/ticket",
    config
  );
  return await response.data;
}

export { getTicket };
