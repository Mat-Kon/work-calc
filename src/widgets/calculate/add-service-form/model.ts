import { LOCAL_LIST_NAME } from '@/shared/constants/calculate-page';
import { IServiceItem } from '@/shared/types/calculate';
import * as yup from 'yup';

export const schemaAddServiceForm = yup.object({
  nameService: yup.string().required(),
  value: yup.number().min(1).required(),
  typeValue: yup.string(),
  cost: yup.number(),
  costPerUnit: yup.number(),
});

export type FormDataAddServiceCalc = yup.InferType<typeof schemaAddServiceForm>;

export const addServiceItem = (data: IServiceItem) => {
  const localData = localStorage.getItem(LOCAL_LIST_NAME);
  if (localData) {
    const localList: IServiceItem[] = JSON.parse(localData);
    const updatedList = [...localList, data];
    localStorage.setItem(LOCAL_LIST_NAME, JSON.stringify(updatedList));
  } else {
    localStorage.setItem(LOCAL_LIST_NAME, JSON.stringify([data]));
  }
};

export const updateServiceItem = (data: IServiceItem) => {
  const localData = localStorage.getItem(LOCAL_LIST_NAME);
  if (localData) {
    const localList: IServiceItem[] = JSON.parse(localData);
    const updatedList = localList.map((item) =>
      item.id === data.id ? { ...item, ...data } : item
    );
    localStorage.setItem(LOCAL_LIST_NAME, JSON.stringify(updatedList));
  }
};
