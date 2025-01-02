import { TextInput } from '@/shared/inputs';
import st from './index.module.scss';
import { useForm } from 'react-hook-form';
import { Order } from '@/shared/types/calculate';
import { forwardRef } from 'react';
import { LOCAL_LIST_NAME } from '@/shared/constants/calculate-page';

export const AddOrderForm = forwardRef<HTMLFormElement>((props, ref) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<Order>();

  const onSubmit = (orderData: Order) => {
    const localServicesList = localStorage.getItem(LOCAL_LIST_NAME);
    if (localServicesList) {
      const orderServices = JSON.parse(localServicesList);
      console.log({ ...orderData, services: orderServices });
    }
  };

  return (
    <form className={st.orderForm} onSubmit={handleSubmit(onSubmit)} ref={ref}>
      <TextInput
        placeholder="ФИО"
        className={`${st.textInput} ${errors.name && st.error}`}
        {...register('name')}
      />
      <TextInput placeholder="Адрес" className={st.textInput} {...register('address')} />
      <TextInput
        placeholder="Номер телефона"
        className={st.textInput}
        {...register('phoneNumber')}
      />
      <label className={st.dateLabel}>
        Замер на
        <TextInput type="datetime-local" {...register('meetingDateTime')} />
      </label>
      <label className={st.dateLabel}>
        Начало работ на
        <TextInput type="datetime-local" {...register('startWorkDate')} />
      </label>
    </form>
  );
});
