import { Event, EventDate, EventPricing } from "@/types/event";

interface OrderRequest {
  event: Event["slug"];
  pricing?: EventPricing["id"];
  date?: EventDate["id"];
}

interface OrderResponse {
  redirect: true;
  redirect_url: string;
}

export { OrderRequest, OrderResponse };
