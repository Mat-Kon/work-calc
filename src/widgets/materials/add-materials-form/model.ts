import { MATERIALS_LIST_NAME } from '@/shared/constants/material-page';
import { IMaterialItemData } from '@/shared/types/materials';
import * as yup from 'yup';

export const schemaAddMaterialForm = yup.object({
  name: yup.string().required(),
  typeValue: yup.string().required(),
  costPerUnit: yup.number().required(),
});

export type FormDataAddMaterial = yup.InferType<typeof schemaAddMaterialForm>;

export const addMaterialItem = (data: IMaterialItemData) => {
  const localData = localStorage.getItem(MATERIALS_LIST_NAME);
  if (localData) {
    const localList: IMaterialItemData[] = JSON.parse(localData);
    const updatedList = [...localList, data];
    localStorage.setItem(MATERIALS_LIST_NAME, JSON.stringify(updatedList));
  } else {
    localStorage.setItem(MATERIALS_LIST_NAME, JSON.stringify([data]));
  }
};

export const updateMaterialItem = (data: IMaterialItemData) => {
  const localData = localStorage.getItem(MATERIALS_LIST_NAME);
  if (localData) {
    const localList: IMaterialItemData[] = JSON.parse(localData);
    const updatedList = localList.map((item) =>
      item.id === data.id ? { ...item, ...data } : item
    );
    localStorage.setItem(MATERIALS_LIST_NAME, JSON.stringify(updatedList));
  }
};
