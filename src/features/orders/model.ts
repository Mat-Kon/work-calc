import { ORDERS_LIST_NAME } from '@/shared/constants/calculate-page';
import { IOrder } from '@/shared/types/calculate';

export const getOrdersList = (): IOrder[] | null => {
  const localData = localStorage.getItem(ORDERS_LIST_NAME);
  if (localData) {
    const localList: IOrder[] = JSON.parse(localData);
    return localList;
  }
  return null;
};

export const getOrderById = (id: string | string[]): IOrder | null => {
  const orders = getOrdersList();
  if (orders) {
    const order = orders.find((order) => order.id === id) ?? null;
    return order;
  } else {
    return null;
  }
};

export const removeOrderById = (id: string): void => {
  const localOrders = localStorage.getItem(ORDERS_LIST_NAME);
  if (localOrders) {
    const orders: IOrder[] = JSON.parse(localOrders);
    const updateOrders = orders.filter((order) => order.id != id);
    localStorage.setItem(ORDERS_LIST_NAME, JSON.stringify(updateOrders));
  }
};
