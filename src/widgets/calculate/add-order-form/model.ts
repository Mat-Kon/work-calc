import { ORDERS_LIST_NAME } from '@/shared/constants/calculate-page';
import { getOrdersList } from '@/features/orders/model';
import { IOrder } from '@/shared/types/calculate';
import * as yup from 'yup';

export const schemaAddOrderForm = yup.object({
  orderNumber: yup.string(),
  name: yup.string().required(),
  address: yup.string().required(),
  meetingDateTime: yup.mixed<string | Date>().required(),
  startWorkDate: yup.mixed<string | Date>().required(),
  phoneNumber: yup.string().required(),
});

export type FormDataAddOrder = yup.InferType<typeof schemaAddOrderForm>;

export const addOrder = (orderData: IOrder) => {
  const orders = getOrdersList();
  if (orders) {
    const updatedList = [...orders, orderData];
    localStorage.setItem(ORDERS_LIST_NAME, JSON.stringify(updatedList));
  } else {
    localStorage.setItem(ORDERS_LIST_NAME, JSON.stringify([orderData]));
  }
};

export const updateOrders = (orderData: IOrder) => {
  const orders = getOrdersList();
  if (orders) {
    const updatedList = orders.map((order) => {
      if (order.id === orderData.id) {
        return orderData;
      }
      return order;
    });
    localStorage.setItem(ORDERS_LIST_NAME, JSON.stringify(updatedList));
  }
};
