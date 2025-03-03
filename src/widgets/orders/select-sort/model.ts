import { getOrdersList } from '@/features/orders/model';
import { ISortedOrder } from '@/shared/types/calculate';

const sortByDateMeeting = () => {
  const orders = getOrdersList();
  if (orders) {
    return orders.toSorted(
      (a, b) => Number(a.meetingDateTime.toString()) - Number(b.meetingDateTime.toString())
    );
  }
};

const sortByDateWork = () => {
  const orders = getOrdersList();
  if (orders) {
    return orders.toSorted(
      (a, b) => Number(a.startWorkDate.toString()) - Number(b.startWorkDate.toString())
    );
  }
};

const sortByTotalCost = () => {
  const orders = getOrdersList();
  if (orders) {
    const ordersWidthTotals: ISortedOrder[] = orders.map((order) => {
      const totalCost = order.orderServices.reduce(
        (acc, currentOrder) => acc + currentOrder.cost,
        0
      );
      return { ...order, totalCost };
    });
    return ordersWidthTotals.toSorted((a, b) => a.totalCost - b.totalCost);
  }
};

export const sortingOrders = (sortValue: string) => {
  if (sortValue === 'дате замера') {
    return sortByDateMeeting();
  }
  if (sortValue === 'дате начала') {
    return sortByDateWork();
  }
  if (sortValue === 'сумме договора') {
    return sortByTotalCost();
  }
};
