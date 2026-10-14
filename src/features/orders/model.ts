import { type OrderSummary } from "@/shared/types/calculate";

export const SORT_OPTIONS = [
  "Сортировать по",
  "дате замера",
  "сумме договора",
  "адресу",
  "имени",
] as const;

export const DEFAULT_SORT = SORT_OPTIONS[0];

const getSubtotal = (order: OrderSummary): number => order.totalCost;

export const getOrderTotal = (order: OrderSummary): number =>
  Math.round(getSubtotal(order) * 100) / 100;

export const searchOrdersByAddress = (
  orders: OrderSummary[],
  query: string,
): OrderSummary[] => {
  const q = query.trim().toLowerCase();
  if (!q) return orders;
  return orders.filter((order) => order.address.toLowerCase().includes(q));
};

export const sortOrders = (
  orders: OrderSummary[],
  sortValue: string,
): OrderSummary[] => {
  if (!sortValue || sortValue === DEFAULT_SORT) return orders;

  const list = [...orders];

  switch (sortValue) {
    case "адресу":
      return list.sort((a, b) => a.address.localeCompare(b.address));
    case "имени":
      return list.sort((a, b) => a.name.localeCompare(b.name));
    case "дате замера":
      return list.sort(
        (a, b) =>
          new Date(a.meetingDateTime).getTime() -
          new Date(b.meetingDateTime).getTime(),
      );
    case "сумме договора":
      return list.sort((a, b) => a.totalCost - b.totalCost);
    default:
      return list;
  }
};
