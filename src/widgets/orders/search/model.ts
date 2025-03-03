import { getOrdersList } from '@/features/orders/model';

export const searchOrdersByAddress = (search: string) => {
  const orders = getOrdersList();
  if (orders) {
    return orders.filter((order) =>
      order.address.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }
};
