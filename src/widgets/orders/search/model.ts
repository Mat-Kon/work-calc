import { ORDERS_LIST_NAME } from '@/shared/constants/calculate-page';
import { IOrder } from '@/shared/types/calculate';

export const searchOrdersByAddress = (search: string) => {
  const localOrders = localStorage.getItem(ORDERS_LIST_NAME);
  if (localOrders) {
    const orders: IOrder[] = JSON.parse(localOrders);
    return orders.filter((order) =>
      order.address.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }
};
