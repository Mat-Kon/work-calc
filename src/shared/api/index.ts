// Клиентские функции вместо localStorage-моделей.
// Черновик текущего расчёта (servicesList) можно и дальше хранить в localStorage.
import type { IOrder } from '@/shared/types/calculate';
import type { IServiceItemData } from '@/shared/types/my-services';

export type CatalogKind = 'SERVICE' | 'MATERIAL';

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? `HTTP ${res.status}`);
  }
  return res.json();
}

type CatalogInput = Omit<IServiceItemData, 'id'>;

export const catalogApi = {
  list: (kind: CatalogKind) => request<IServiceItemData[]>(`/api/catalog?kind=${kind}`),
  add: (kind: CatalogKind, data: CatalogInput) =>
    request<IServiceItemData>('/api/catalog', {
      method: 'POST',
      body: JSON.stringify({ kind, ...data }),
    }),
  update: (id: string, data: CatalogInput) =>
    request(`/api/catalog/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id: string) => request(`/api/catalog/${id}`, { method: 'DELETE' }),
};

// Что отправляется на сервер при сохранении заказа
export type OrderInput = Omit<IOrder, 'id' | 'orderServices'> & {
  orderServices: {
    name: string;
    typeValue: string;
    costPerUnit: number;
    count: number;
    kind?: CatalogKind;
  }[];
};

export const ordersApi = {
  list: () => request<IOrder[]>('/api/orders'),
  get: (id: string) => request<IOrder>(`/api/orders/${id}`),
  create: (data: OrderInput) =>
    request<IOrder>('/api/orders', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: OrderInput) =>
    request<IOrder>(`/api/orders/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id: string) => request(`/api/orders/${id}`, { method: 'DELETE' }),
};

// datetime-local отдаёт «2026-10-14T10:00» без пояса. Отправляем как ISO с учётом часового пояса пользователя
export const toIso = (localValue: string | Date) => new Date(localValue).toISOString();

// ISO из БД -> значение для <input type="datetime-local"> в локальном времени
export const toInputValue = (iso: string | Date) => {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};
