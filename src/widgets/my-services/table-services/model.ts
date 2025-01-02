import { MY_SERVICES_LIST_NAME } from '@/shared/constants/my-service-page';
import { IServiceItemData } from '@/shared/types/my-services';

export const deleteServiceItem = (id: string) => {
  const localList = localStorage.getItem(MY_SERVICES_LIST_NAME);
  if (localList) {
    const servicesList: IServiceItemData[] = JSON.parse(localList);
    const filteredList = servicesList.filter((item) => item.id !== id);
    localStorage.setItem(MY_SERVICES_LIST_NAME, JSON.stringify(filteredList));
  }
};
