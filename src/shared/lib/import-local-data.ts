// Одноразовый перенос старых данных из localStorage на сервер.
// Вызови из кнопки «Перенести данные из браузера» после входа.
import { catalogApi, ordersApi, toIso } from '@/shared/api';
import type { IOrder } from '@/shared/types/calculate';
import type { IServiceItemData } from '@/shared/types/my-services';

const read = <T>(key: string): T[] => {
  try {
    return JSON.parse(localStorage.getItem(key) ?? '[]');
  } catch {
    return [];
  }
};

export async function importLocalData() {
  const services = read<IServiceItemData>('myServicesDB');
  const materials = read<IServiceItemData>('materialsDB');
  const orders = read<IOrder>('ordersList');

  for (const s of services) await catalogApi.add('SERVICE', s);
  for (const m of materials) await catalogApi.add('MATERIAL', m);

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

  return { services: services.length, materials: materials.length, orders: orders.length };
}
