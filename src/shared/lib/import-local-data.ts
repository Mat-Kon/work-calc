import { catalogApi, ordersApi, toIso } from '@/shared/api';
import type { IOrder } from '@/shared/types/calculate';
import type { IServiceItemData } from '@/shared/types/my-services';

const SERVICES_KEY = 'myServicesDB';
const MATERIALS_KEY = 'materialsDB';
const ORDERS_KEY = 'ordersList';

const read = <T>(key: string): T[] => {
  try {
    return JSON.parse(localStorage.getItem(key) ?? '[]');
  } catch {
    return [];
  }
};

export const countLocalData = () =>
  read(SERVICES_KEY).length + read(MATERIALS_KEY).length + read(ORDERS_KEY).length;

export async function importAll() {
  const services = read<IServiceItemData>(SERVICES_KEY);
  const materials = read<IServiceItemData>(MATERIALS_KEY);
  const orders = read<IOrder>(ORDERS_KEY);

  for (const s of services) await catalogApi.add('SERVICE', s);
  for (const m of materials) await catalogApi.add('MATERIAL', m);
  localStorage.removeItem(SERVICES_KEY);
  localStorage.removeItem(MATERIALS_KEY);

  const materialNames = new Set(materials.map((m) => m.name));
  const failed: IOrder[] = [];

  for (const o of orders) {
    try {
      await ordersApi.create({
        orderNumber: o.orderNumber ?? '',
        name: o.name,
        address: o.address,
        phoneNumber: o.phoneNumber,
        meetingDateTime: toIso(o.meetingDateTime),
        startWorkDate: toIso(o.startWorkDate),
        orderServices: (o.orderServices ?? []).map((s) => ({
          ...s,
          kind: materialNames.has(s.name) ? ('MATERIAL' as const) : ('SERVICE' as const),
        })),
      });
    } catch {
      failed.push(o);
    }
  }

  if (failed.length === 0) {
    localStorage.removeItem(ORDERS_KEY);
  } else {
    // оставляем в браузере только те, что не перенеслись (например, с некорректной датой)
    localStorage.setItem(ORDERS_KEY, JSON.stringify(failed));
  }

  return {
    catalog: services.length + materials.length,
    orders: orders.length - failed.length,
    failed: failed.length,
  };
}
