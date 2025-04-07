import { MY_SERVICES_LIST_NAME } from '@/shared/constants/my-service-page';
import { IServiceItemData } from '@/shared/types/my-services';
import * as yup from 'yup';

export const schemaAddServiceForm = yup.object({
  nameService: yup.string().required(),
  typeValue: yup.string().required(),
  costPerUnit: yup.number().required(),
});

export type FormDataAddMyServiceForm = yup.InferType<typeof schemaAddServiceForm>;

export const addServiceItem = (data: IServiceItemData) => {
  const localData = localStorage.getItem(MY_SERVICES_LIST_NAME);
  if (localData) {
    const localList: IServiceItemData[] = JSON.parse(localData);
    const updatedList = [...localList, data];
    localStorage.setItem(MY_SERVICES_LIST_NAME, JSON.stringify(updatedList));
  } else {
    localStorage.setItem(MY_SERVICES_LIST_NAME, JSON.stringify([data]));
  }
};

export const updateServiceItem = (data: IServiceItemData) => {
  const localData = localStorage.getItem(MY_SERVICES_LIST_NAME);
  if (localData) {
    const localList: IServiceItemData[] = JSON.parse(localData);
    const updatedList = localList.map((item) =>
      item.id === data.id ? { ...item, ...data } : item
    );
    localStorage.setItem(MY_SERVICES_LIST_NAME, JSON.stringify(updatedList));
  }
};
