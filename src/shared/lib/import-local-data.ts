// Одноразовый перенос старых данных из localStorage на сервер.
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

export const countLocalCatalog = () => read(SERVICES_KEY).length + read(MATERIALS_KEY).length;

export async function importCatalog() {
  const services = read<IServiceItemData>(SERVICES_KEY);
  const materials = read<IServiceItemData>(MATERIALS_KEY);

  for (const s of services) await catalogApi.add('SERVICE', s);
  for (const m of materials) await catalogApi.add('MATERIAL', m);

  // чистим только после успешной загрузки всего
  localStorage.removeItem(SERVICES_KEY);
  localStorage.removeItem(MATERIALS_KEY);

  return services.length + materials.length;
}

// Заказы подключим на следующем шаге, когда страницы заказов перейдут на API
export async function importOrders() {
  const orders = read<IOrder>(ORDERS_KEY);

  for (const o of orders) {
    await ordersApi.create({
      orderNumber: o.orderNumber ?? '',
      name: o.name,
      address: o.address,
      phoneNumber: o.phoneNumber,
      meetingDateTime: toIso(o.meetingDateTime),
      startWorkDate: toIso(o.startWorkDate),
      orderServices: o.orderServices ?? [],
    });
  }

  localStorage.removeItem(ORDERS_KEY);
  return orders.length;
}
