import { ORDERS_LIST_NAME } from '@/shared/constants/calculate-page';
import { IOrder } from '@/shared/types/calculate';
import * as yup from 'yup';

export const schemaAddOrderForm = yup.object({
  name: yup.string().required(),
  address: yup.string().required(),
  meetingDateTime: yup.date().required(),
  startWorkDate: yup.date().required(),
  phoneNumber: yup.string().required(),
});

export type FormDataAddOrder = yup.InferType<typeof schemaAddOrderForm>;

export const addOrder = (orderData: IOrder) => {
  const localData = localStorage.getItem(ORDERS_LIST_NAME);
  if (localData) {
    const localList: IOrder[] = JSON.parse(localData);
    const updatedList = [...localList, orderData];
    localStorage.setItem(ORDERS_LIST_NAME, JSON.stringify(updatedList));
  } else {
    localStorage.setItem(ORDERS_LIST_NAME, JSON.stringify([orderData]));
  }
};
