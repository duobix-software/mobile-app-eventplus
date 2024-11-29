import { AxiosRequestConfig } from "axios";
import { api } from "./api";

async function storeCustomerTags(
  data: string[],
  config: AxiosRequestConfig = {}
) {
  const response = await api.post("/store-tags", data, config);
  return await response.data;
}

export { storeCustomerTags };
