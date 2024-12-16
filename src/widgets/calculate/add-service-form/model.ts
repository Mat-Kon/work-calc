import { LOCAL_LIST_NAME } from '@/shared/constants/calculate-page';
import { TServiceItem } from '@/shared/types/calculate';

export const handleAddService = (data: TServiceItem) => {
  const localData = localStorage.getItem(LOCAL_LIST_NAME);
  if (localData) {
    const localList: TServiceItem[] = JSON.parse(localData);
    const updatedList = [...localList, data];
    localStorage.setItem(LOCAL_LIST_NAME, JSON.stringify(updatedList));
  } else {
    localStorage.setItem(LOCAL_LIST_NAME, JSON.stringify([data]));
  }
};
