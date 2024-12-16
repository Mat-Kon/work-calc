import { LOCAL_LIST_NAME } from '@/shared/constants/calculate-page';
import { TServiceItem } from '@/shared/types/calculate';

export const deleteServiceItem = (id: string) => {
  const localList = localStorage.getItem(LOCAL_LIST_NAME);
  if (localList) {
    const servicesList: TServiceItem[] = JSON.parse(localList);
    const filteredList = servicesList.filter((item) => item.id !== id);
    localStorage.setItem(LOCAL_LIST_NAME, JSON.stringify(filteredList));
  }
};
