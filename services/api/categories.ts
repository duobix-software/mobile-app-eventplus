import { api } from "./api";
import { AxiosRequestConfig } from "axios";
import { SimplePagination } from "@/types/pagination";
import { Category } from "@/types/category";

async function getCategories(config: AxiosRequestConfig = {}): Promise<SimplePagination<Category[]>> {
  const response = await api.get("/categories", config);
  return await response.data;
}

export { getCategories };
