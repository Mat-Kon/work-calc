import { TextInput } from '@/shared/inputs';
import st from './index.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { forwardRef } from 'react';
import { LOCAL_LIST_NAME } from '@/shared/constants/calculate-page';
import { yupResolver } from '@hookform/resolvers/yup';
import { addOrder, FormDataAddOrder, schemaAddOrderForm } from './model';
import { IServiceItem } from '@/shared/types/calculate';
import { useRouter } from 'next/navigation';

export const AddOrderForm = forwardRef<HTMLFormElement>((props, ref) => {
  const { replace } = useRouter();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormDataAddOrder>({
    resolver: yupResolver(schemaAddOrderForm),
  });

  const onSubmit = (orderData: FormDataAddOrder) => {
    const localServicesList = localStorage.getItem(LOCAL_LIST_NAME);
    let orderServices: IServiceItem[] = [];
    if (localServicesList) {
      orderServices = JSON.parse(localServicesList);
    }
    const orderId = uuidv4();
    const order = { ...orderData, id: orderId, orderServices: orderServices };
    addOrder(order);
    localStorage.removeItem(LOCAL_LIST_NAME);
    replace(`/orders/${order.id}`);
  };

  return (
    <form className={st.orderForm} onSubmit={handleSubmit(onSubmit)} ref={ref}>
      <TextInput
        placeholder="ФИО"
        className={`${st.textInput} ${errors.name && st.error}`}
        {...register('name')}
      />
      <TextInput
        placeholder="Адрес"
        className={`${st.textInput} ${errors.address && st.error}`}
        {...register('address')}
      />
      <TextInput
        placeholder="Номер телефона"
        className={`${st.textInput} ${errors.phoneNumber && st.error}`}
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
