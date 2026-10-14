import * as yup from 'yup';

export const schemaAddMaterialForm = yup.object({
  name: yup.string().required(),
  typeValue: yup.string().required(),
  costPerUnit: yup.number().required(),
});

export type FormDataAddMaterial = yup.InferType<typeof schemaAddMaterialForm>;
