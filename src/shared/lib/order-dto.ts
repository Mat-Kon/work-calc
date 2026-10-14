import { type Order, type OrderItem } from "@prisma/client";

export type ItemKindDto = "SERVICE" | "MATERIAL";
export type OrderStatusDto = "QUEUED" | "IN_PROGRESS" | "DONE";

export interface OrderItemDto {
  id: string;
  kind: ItemKindDto;
  name: string;
  typeValue: string;
  costPerUnit: number;
  count: number;
  cost: number;
}

export interface OrderDto {
  id: string;
  orderNumber: string | null;
  name: string;
  address: string;
  phoneNumber: string;
  status: OrderStatusDto;
  meetingDateTime: string;
  startWorkDate: string;
  createdAt: string;
  items: OrderItemDto[];
}

const toNumber = (value: unknown): number => {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value);
  if (value && typeof value === "object" && "toNumber" in value) {
    return (value as { toNumber: () => number }).toNumber();
  }
  return Number(value);
};

export function orderToDto(order: Order & { items: OrderItem[] }): OrderDto {
  return {
    id: order.id,
    orderNumber: order.orderNumber,
    name: order.name,
    address: order.address,
    phoneNumber: order.phoneNumber,
    status: order.status,
    meetingDateTime: order.meetingDateTime.toISOString(),
    startWorkDate: order.startWorkDate.toISOString(),
    createdAt: order.createdAt.toISOString(),
    items: order.items.map((item) => {
      const costPerUnit = toNumber(item.costPerUnit);
      const count = toNumber(item.count);
      return {
        id: item.id,
        kind: item.kind,
        name: item.name,
        typeValue: item.typeValue,
        costPerUnit,
        count,
        cost: Math.round(costPerUnit * count * 100) / 100,
      };
    }),
  };
}

export interface ParsedOrderItemInput {
  kind: ItemKindDto;
  name: string;
  typeValue: string;
  costPerUnit: number;
  count: number;
}

export interface ParsedOrderBody {
  orderNumber: string;
  name: string;
  address: string;
  phoneNumber: string;
  meetingDateTime: Date;
  startWorkDate: Date;
  items: ParsedOrderItemInput[];
}

export function parseOrderBody(body: unknown): ParsedOrderBody {
  const data = (body ?? {}) as Record<string, unknown>;
  const rawItems = (data.items ?? data.orderServices ?? []) as Array<
    Record<string, unknown>
  >;

  return {
    orderNumber: String(data.orderNumber ?? ""),
    name: String(data.name ?? ""),
    address: String(data.address ?? ""),
    phoneNumber: String(data.phoneNumber ?? ""),
    meetingDateTime: new Date(String(data.meetingDateTime)),
    startWorkDate: new Date(String(data.startWorkDate)),
    items: rawItems.map((item) => ({
      kind: item.kind === "MATERIAL" ? "MATERIAL" : "SERVICE",
      name: String(item.name ?? ""),
      typeValue: String(item.typeValue ?? ""),
      costPerUnit: Number(item.costPerUnit ?? 0),
      count: Number(item.count ?? 0),
    })),
  };
}
