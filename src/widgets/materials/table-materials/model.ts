import { MATERIALS_LIST_NAME } from '@/shared/constants/material-page';
import { IMaterialItemData } from '@/shared/types/materials';

export const deleteMAterialItem = (id: string) => {
  const localList = localStorage.getItem(MATERIALS_LIST_NAME);
  if (localList) {
    const servicesList: IMaterialItemData[] = JSON.parse(localList);
    const filteredList = servicesList.filter((item) => item.id !== id);
    localStorage.setItem(MATERIALS_LIST_NAME, JSON.stringify(filteredList));
  }
};
