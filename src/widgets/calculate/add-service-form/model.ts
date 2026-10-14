import * as yup from 'yup';

import { LOCAL_LIST_NAME } from '@/shared/constants/calculate-page';
import { getCalcList } from '@/shared/helpers/functions';
import { type CalcItem } from '@/shared/types/calculate';

export const schemaAddServiceForm = yup.object({
  name: yup.string().required(),
  count: yup.number().min(1).required(),
  typeValue: yup.string(),
  cost: yup.number(),
  costPerUnit: yup.number(),
});

export type FormDataAddServiceCalc = yup.InferType<typeof schemaAddServiceForm>;

export const addServiceItem = (data: CalcItem) => {
  const list = getCalcList() ?? [];
  const updated = [...list, data];
  localStorage.setItem(LOCAL_LIST_NAME, JSON.stringify(updated));
};

export const updateServiceItem = (data: CalcItem) => {
  const list = getCalcList();
  if (!list) return;

  const updated = list.map((item) =>
    item.id === data.id ? { ...item, ...data } : item,
  );
  localStorage.setItem(LOCAL_LIST_NAME, JSON.stringify(updated));
};