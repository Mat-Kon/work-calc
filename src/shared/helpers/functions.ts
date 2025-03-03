import { LOCAL_LIST_NAME } from '../constants/calculate-page';
import { IServiceItem } from '../types/calculate';

export const isMobileView = () => {
  return window.screen.width < 550;
};

export const getServicesList = (): IServiceItem[] | null => {
  const localServicesList = localStorage.getItem(LOCAL_LIST_NAME);
  if (localServicesList) {
    const orderServices: IServiceItem[] = JSON.parse(localServicesList);
    return orderServices;
  }
  return null;
};
