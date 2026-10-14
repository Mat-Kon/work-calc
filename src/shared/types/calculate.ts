export type ItemKind = "SERVICE" | "MATERIAL";
export type OrderStatus = "QUEUED" | "IN_PROGRESS" | "DONE";

export interface CalcItem {
  id: string;
  kind?: ItemKind;
  name: string;
  typeValue: string;
  count: number;
  cost: number;
  costPerUnit: number;
}

export interface Order {
  id: string;
  orderNumber: string | null;
  name: string;
  address: string;
  phoneNumber: string;
  status: OrderStatus;
  discountPercent: number;
  isPrepaid: boolean;
  meetingDateTime: string;
  startWorkDate: string;
  createdAt: string;
  items: CalcItem[];
}

export interface OrderSummary extends Omit<Order, "items"> {
  totalCost: number;
}

export interface OrderInput {
  orderNumber: string;
  name: string;
  address: string;
  phoneNumber: string;
  discountPercent: number;
  isPrepaid: boolean;
  meetingDateTime: string;
  startWorkDate: string;
  items: Array<{
    name: string;
    typeValue: string;
    costPerUnit: number;
    count: number;
    kind?: ItemKind;
  }>;
}
