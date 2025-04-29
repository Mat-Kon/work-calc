import { MATERIALS_LIST_NAME } from '@/shared/constants/material-page';
import { IMaterialItemData } from '@/shared/types/materials';

export const getMaterialsList = () => {
  const storageServiceList = localStorage.getItem(MATERIALS_LIST_NAME);
  if (storageServiceList) {
    const myServicesList: IMaterialItemData[] = JSON.parse(storageServiceList);
    return myServicesList;
  }
};
