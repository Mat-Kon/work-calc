import { LOCAL_LIST_NAME } from '../constants/calculate-page';
import { ICalcItem } from '../types/calculate';

export const isMobileView = () => {
  return window.screen.width < 550;
};

export const getCalcList = (): ICalcItem[] | null => {
  const localServicesList = localStorage.getItem(LOCAL_LIST_NAME);
  if (localServicesList) {
    const orderServices: ICalcItem[] = JSON.parse(localServicesList);
    return orderServices;
  }
  return null;
};

export const removeCalcList = (): void => {
  localStorage.removeItem(LOCAL_LIST_NAME);
};
