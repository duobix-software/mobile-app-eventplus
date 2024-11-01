import { AxiosRequestConfig } from "axios";
import { api } from "./api";
import { CursorPagination } from "@/types/pagination";
import { Event } from "@/types/event";

async function getEvents(
  config: AxiosRequestConfig = {}
): Promise<CursorPagination<Event[]>> {
  const response = await api.get("/events", config);
  return await response.data;
}

async function getEventBySlug(config: AxiosRequestConfig = {}): Promise<Event> {
  const response = await api.get("/events/{slug}", config);
  return await response.data;
}

export { getEvents, getEventBySlug };
