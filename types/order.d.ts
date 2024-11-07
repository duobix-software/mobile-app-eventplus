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

type OrderStatus =
  | "Pending"
  | "Failed"
  | "Confirmed"
  | "Canceled"
  | "Refunded"
  | "TicketIssued"
  | "CheckedIn"

interface Order {
  id: string;
  status: OrderStatus;
  created_at: string;
}

export { OrderRequest, OrderResponse, Order, OrderStatus };
