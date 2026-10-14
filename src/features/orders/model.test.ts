import type { IOrder } from '@/shared/types/calculate';
import { getOrderTotal, searchOrdersByAddress, sortOrders } from './model';

const makeOrder = (
  id: string,
  overrides: Partial<IOrder> = {},
  costs: number[] = [100]
): IOrder => ({
  id,
  name: 'Иван',
  address: 'ул. Ленина, 1',
  phoneNumber: '123',
  meetingDateTime: '2026-10-14T10:00:00.000Z',
  startWorkDate: '2026-10-20T10:00:00.000Z',
  orderServices: costs.map((cost, i) => ({
    id: `${id}-${i}`,
    name: 'Работа',
    typeValue: 'шт',
    costPerUnit: cost,
    count: 1,
    cost,
  })),
  ...overrides,
});

describe('orders model', () => {
  it('считает сумму заказа', () => {
    expect(getOrderTotal(makeOrder('a', {}, [100, 250.5]))).toBe(350.5);
  });

  it('сортирует по дате замера по возрастанию', () => {
    const late = makeOrder('late', { meetingDateTime: '2026-12-01T10:00:00.000Z' });
    const early = makeOrder('early', { meetingDateTime: '2026-10-01T10:00:00.000Z' });
    expect(sortOrders([late, early], 'дате замера').map((o) => o.id)).toEqual(['early', 'late']);
  });

  it('сортирует по сумме договора', () => {
    const cheap = makeOrder('cheap', {}, [10]);
    const expensive = makeOrder('expensive', {}, [1000]);
    expect(sortOrders([expensive, cheap], 'сумме договора').map((o) => o.id)).toEqual([
      'cheap',
      'expensive',
    ]);
  });

  it('не меняет порядок для значения-заглушки', () => {
    const orders = [makeOrder('a'), makeOrder('b')];
    expect(sortOrders(orders, 'Сортировать по')).toBe(orders);
  });

  it('ищет по адресу без учёта регистра', () => {
    const a = makeOrder('a', { address: 'Улица Ленина, 5' });
    const b = makeOrder('b', { address: 'Проспект Мира, 10' });
    expect(searchOrdersByAddress([a, b], 'ленина')).toEqual([a]);
    expect(searchOrdersByAddress([a, b], '')).toEqual([a, b]);
  });
});
