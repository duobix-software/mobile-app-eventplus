import { AxiosRequestConfig } from "axios";
import { api } from "./api";
import { Order, OrderRequest, OrderResponse } from "@/types/order";
import { SimplePagination } from "@/types/pagination";

async function order(
  data: OrderRequest,
  config: AxiosRequestConfig = {}
): Promise<OrderResponse> {
  const response = await api.post("/checkout", data, config);
  return response.data;
}

async function getOrders(
  config: AxiosRequestConfig = {}
): Promise<SimplePagination<Order[]>> {
  const response = await api.get("/orders{?page,status}", config);
  return response.data;
}

async function getOrder(config: AxiosRequestConfig = {}): Promise<Order> {
  const response = await api.get("/orders/{id}", config);
  return response.data;
}

export { order, getOrders, getOrder };
