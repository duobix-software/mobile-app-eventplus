interface Event {
  slug: string;
  title: string;
  description: string;
  status: "Active";
  banner: string;
  max_participants: number;
  price: string;
  date: string;
  dates: EventDate[];
  pricings: EventPricing[];
  created_at: string;
  checkout_base_url: string;
}

interface EventPricing {
  id: string;
  name: string;
  description: string;
  quota: number;
  price: string;
}

interface EventDate {
  id: string;
  start_date: string;
  end_date: string;
  duration: string;
}

export { Event, EventPricing, EventDate };
