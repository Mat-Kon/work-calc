import { LOCAL_LIST_NAME } from '@/shared/constants/calculate-page';
import { getCalcList } from '@/shared/helpers/functions';

export const deleteServiceItem = (id: string) => {
  const servicesList = getCalcList();
  if (servicesList) {
    const filteredList = servicesList.filter((item) => item.id !== id);
    localStorage.setItem(LOCAL_LIST_NAME, JSON.stringify(filteredList));
  }
};
