import { AxiosRequestConfig } from "axios";
import { api } from "./api";

async function getTicket(config: AxiosRequestConfig = {}) {
  const response = await api.get(
    "/orders/{order}/events/{event}/ticket",
    config
  );
  return await response.data;
}

export { getTicket };
