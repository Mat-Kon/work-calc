import { LOCAL_LIST_NAME } from '@/shared/constants/calculate-page';
import { MY_SERVICES_LIST_NAME } from '@/shared/constants/my-service-page';
import { getServicesList } from '@/shared/helpers/functions';
import { IServiceItem } from '@/shared/types/calculate';
import { IServiceItemData } from '@/shared/types/my-services';
import * as yup from 'yup';

export const schemaAddServiceForm = yup.object({
  nameService: yup.string().required(),
  count: yup.number().min(1).required(),
  typeValue: yup.string(),
  cost: yup.number(),
  costPerUnit: yup.number(),
});

export type FormDataAddServiceCalc = yup.InferType<typeof schemaAddServiceForm>;

export const getMyServicesList = () => {
  const storageServiceList = localStorage.getItem(MY_SERVICES_LIST_NAME);
  if (storageServiceList) {
    const myServicesList: IServiceItemData[] = JSON.parse(storageServiceList);
    return myServicesList;
  }
};

export const addServiceItem = (data: IServiceItem) => {
  const localList = getServicesList();
  if (localList) {
    const updatedList = [...localList, data];
    localStorage.setItem(LOCAL_LIST_NAME, JSON.stringify(updatedList));
  } else {
    localStorage.setItem(LOCAL_LIST_NAME, JSON.stringify([data]));
  }
};

export const updateServiceItem = (data: IServiceItem) => {
  const localList = getServicesList();
  if (localList) {
    const updatedList = localList.map((item) =>
      item.id === data.id ? { ...item, ...data } : item
    );
    localStorage.setItem(LOCAL_LIST_NAME, JSON.stringify(updatedList));
  }
};
