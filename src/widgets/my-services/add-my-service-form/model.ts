import * as yup from 'yup';

export const schemaAddServiceForm = yup.object({
  name: yup.string().required(),
  typeValue: yup.string().required(),
  costPerUnit: yup.number().required(),
});

export type FormDataAddMyServiceForm = yup.InferType<typeof schemaAddServiceForm>;
