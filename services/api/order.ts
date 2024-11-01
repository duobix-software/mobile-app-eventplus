import { AxiosRequestConfig } from "axios";
import { api } from "./api";
import { OrderRequest, OrderResponse } from "@/types/order";

async function order(data: OrderRequest, config: AxiosRequestConfig = {}): Promise<OrderResponse> {
  const response = await api.post("/checkout", data, config);
  return response.data;
}

export { order };
