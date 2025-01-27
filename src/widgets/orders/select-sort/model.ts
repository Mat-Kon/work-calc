import { ORDERS_LIST_NAME } from '@/shared/constants/calculate-page';
import { IOrder, ISortedOrder } from '@/shared/types/calculate';

const sortByDateMeeting = () => {
  const localOrders = localStorage.getItem(ORDERS_LIST_NAME);
  if (localOrders) {
    const orders: IOrder[] = JSON.parse(localOrders);
    return orders.toSorted(
      (a, b) => Number(a.meetingDateTime.toString()) - Number(b.meetingDateTime.toString())
    );
  }
};

const sortByDateWork = () => {
  const localOrders = localStorage.getItem(ORDERS_LIST_NAME);
  if (localOrders) {
    const orders: IOrder[] = JSON.parse(localOrders);
    return orders.toSorted(
      (a, b) => Number(a.startWorkDate.toString()) - Number(b.startWorkDate.toString())
    );
  }
};

const sortByTotalCost = () => {
  const localOrders = localStorage.getItem(ORDERS_LIST_NAME);
  if (localOrders) {
    const orders: IOrder[] = JSON.parse(localOrders);
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
