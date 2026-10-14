import { LOCAL_LIST_NAME } from '@/shared/constants/calculate-page';
import { getCalcList } from '@/shared/helpers/functions';
import { ICalcItem } from '@/shared/types/calculate';
import * as yup from 'yup';

export const schemaAddServiceForm = yup.object({
  name: yup.string().required(),
  count: yup.number().min(1).required(),
  typeValue: yup.string(),
  cost: yup.number(),
  costPerUnit: yup.number(),
});

export type FormDataAddServiceCalc = yup.InferType<typeof schemaAddServiceForm>;

// Черновик расчёта пока остаётся в localStorage: это временные данные до сохранения заказа
export const addServiceItem = (data: ICalcItem) => {
  const localList = getCalcList();
  if (localList) {
    const updatedList = [...localList, data];
    localStorage.setItem(LOCAL_LIST_NAME, JSON.stringify(updatedList));
  } else {
    localStorage.setItem(LOCAL_LIST_NAME, JSON.stringify([data]));
  }
};

export const updateServiceItem = (data: ICalcItem) => {
  const localList = getCalcList();
  if (localList) {
    const updatedList = localList.map((item) =>
      item.id === data.id ? { ...item, ...data } : item
    );
    localStorage.setItem(LOCAL_LIST_NAME, JSON.stringify(updatedList));
  }
};
