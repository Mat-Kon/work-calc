import { LOCAL_LIST_NAME } from "../constants/calculate-page";
import { type CalcItem } from "../types/calculate";

export const isMobileView = () => {
  if (typeof window === "undefined") return false;
  return window.screen.width < 550;
};

export const getCalcList = (): CalcItem[] | null => {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(LOCAL_LIST_NAME);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as CalcItem[];
  } catch {
    return null;
  }
};

export const removeCalcList = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LOCAL_LIST_NAME);
};
