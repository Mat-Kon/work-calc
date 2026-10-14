import { LOCAL_LIST_NAME } from "@/shared/constants/calculate-page";
import { getCalcList } from "@/shared/helpers/functions";

export const deleteServiceItem = (id: string) => {
  const list = getCalcList();
  if (!list) return;

  const filtered = list.filter((item) => item.id !== id);
  localStorage.setItem(LOCAL_LIST_NAME, JSON.stringify(filtered));
};
