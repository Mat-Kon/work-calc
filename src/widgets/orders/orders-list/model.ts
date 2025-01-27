import { ORDERS_LIST_NAME } from '@/shared/constants/calculate-page';
import { IOrder } from '@/shared/types/calculate';

export const getOrders = (): IOrder[] => {
  const localOrders = localStorage.getItem(ORDERS_LIST_NAME);
  if (localOrders) {
    const orders: IOrder[] = JSON.parse(localOrders);
    return orders;
  } else {
    return [];
  }
};

export const removeOrder = (id: string): void => {
  const localOrders = localStorage.getItem(ORDERS_LIST_NAME);
  if (localOrders) {
    const orders: IOrder[] = JSON.parse(localOrders);
    const updateOrders = orders.filter((order) => order.id != id);
    localStorage.setItem(ORDERS_LIST_NAME, JSON.stringify(updateOrders));
  }
};
