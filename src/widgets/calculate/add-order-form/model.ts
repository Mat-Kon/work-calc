import * as yup from "yup";

export const schemaAddOrderForm = yup.object({
  orderNumber: yup.string(),
  name: yup.string().required(),
  address: yup.string().required(),
  meetingDateTime: yup.mixed<string | Date>().required(),
  startWorkDate: yup.mixed<string | Date>().required(),
  phoneNumber: yup.string().required(),
  discountPercent: yup
    .number()
    .min(0)
    .max(100)
    .transform((value, original) => (original === "" ? 0 : value))
    .default(0),
  isPrepaid: yup.boolean().default(false),
});

export type FormDataAddOrder = yup.InferType<typeof schemaAddOrderForm>;
