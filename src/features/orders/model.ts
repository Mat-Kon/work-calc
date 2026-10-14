import type { IOrder } from '@/shared/types/calculate';

// Чистые функции без обращения к хранилищу: легко тестировать

export const SORT_OPTIONS = ['Сортировать по', 'дате замера', 'дате начала', 'сумме договора'];

export const getOrderTotal = (order: IOrder): number =>
  order.orderServices.reduce((acc, item) => acc + item.cost, 0);

const time = (date: Date | string) => new Date(date).getTime();

export const searchOrdersByAddress = (orders: IOrder[], search: string): IOrder[] => {
  const query = search.trim().toLocaleLowerCase();
  if (!query) return orders;
  return orders.filter((order) => order.address.toLocaleLowerCase().includes(query));
};

export const sortOrders = (orders: IOrder[], sortValue: string): IOrder[] => {
  switch (sortValue) {
    case 'дате замера':
      return [...orders].sort((a, b) => time(a.meetingDateTime) - time(b.meetingDateTime));
    case 'дате начала':
      return [...orders].sort((a, b) => time(a.startWorkDate) - time(b.startWorkDate));
    case 'сумме договора':
      return [...orders].sort((a, b) => getOrderTotal(a) - getOrderTotal(b));
    default:
      return orders;
  }
};
