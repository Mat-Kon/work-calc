import * as yup from 'yup';

export const schemaAddOrderForm = yup.object({
  orderNumber: yup.string(),
  name: yup.string().required(),
  address: yup.string().required(),
  meetingDateTime: yup.mixed<string | Date>().required(),
  startWorkDate: yup.mixed<string | Date>().required(),
  phoneNumber: yup.string().required(),
});

export type FormDataAddOrder = yup.InferType<typeof schemaAddOrderForm>;
