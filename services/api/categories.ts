import { api } from "./api";
import { AxiosRequestConfig } from "axios";
import { CursorPagination } from "@/types/pagination";
import { Category } from "@/types/category";

async function getCategories(config: AxiosRequestConfig = {}): Promise<CursorPagination<Category[]>> {
  const response = await api.get("/categories", config);
  return await response.data;
}

export { getCategories };
