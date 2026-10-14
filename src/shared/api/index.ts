import {
  type ItemKind,
  type Order,
  type OrderInput,
  type OrderSummary,
} from "@/shared/types/calculate";

export type CatalogKind = ItemKind;

export interface CatalogItem {
  id: string;
  name: string;
  typeValue: string;
  costPerUnit: number;
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? `HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}

type CatalogInput = Omit<CatalogItem, "id">;

export const catalogApi = {
  list: (kind: CatalogKind) =>
    request<CatalogItem[]>(`/api/catalog?kind=${kind}`),
  add: (kind: CatalogKind, data: CatalogInput) =>
    request<CatalogItem>("/api/catalog", {
      method: "POST",
      body: JSON.stringify({ kind, ...data }),
    }),
  update: (id: string, data: CatalogInput) =>
    request<CatalogItem>(`/api/catalog/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  remove: (id: string) =>
    request<void>(`/api/catalog/${id}`, { method: "DELETE" }),
};

export const ordersApi = {
  list: () => request<OrderSummary[]>("/api/orders"),
  get: (id: string) => request<Order>(`/api/orders/${id}`),
  create: (data: OrderInput) =>
    request<Order>("/api/orders", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: OrderInput) =>
    request<Order>(`/api/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  remove: (id: string) =>
    request<void>(`/api/orders/${id}`, { method: "DELETE" }),
};

export const toIso = (value: string | Date) => new Date(value).toISOString();

export const toInputValue = (iso: string | Date) => {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};
