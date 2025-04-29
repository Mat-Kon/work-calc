import { TextInput } from '@/shared/inputs';
import st from './index.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { forwardRef, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { addOrder, FormDataAddOrder, schemaAddOrderForm, updateOrders } from './model';
import { IOrder } from '@/shared/types/calculate';
import { useRouter } from 'next/navigation';
import { getCalcList, removeCalcList } from '@/shared/helpers/functions';

interface Props {
  order?: IOrder | null;
}

export const AddOrderForm = forwardRef<HTMLFormElement, Props>(({ order }, ref) => {
  const { replace } = useRouter();
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<FormDataAddOrder>({
    resolver: yupResolver(schemaAddOrderForm),
  });

  useEffect(() => {
    if (order) {
      const { id: _id, orderServices: _orderServices, ...orderData } = order;
      const defaultData = {
        ...orderData,
        startWorkDate: orderData.startWorkDate.toString().slice(0, 16),
        meetingDateTime: orderData.meetingDateTime.toString().slice(0, 16),
      };

      reset(defaultData);
    }
  }, [order]);

  const onSubmit = (orderData: FormDataAddOrder) => {
    const orderServices = getCalcList();
    const orderId = uuidv4();

    if (orderServices) {
      if (order) {
        const updateOrder = { ...orderData, id: order.id, orderServices: orderServices };
        updateOrders(updateOrder);
      } else {
        const updateOrder = { ...orderData, id: orderId, orderServices: orderServices };
        addOrder(updateOrder);
      }
    }
    replace(`/orders/${order?.id ?? orderId}`);
    removeCalcList();
  };

  return (
    <form className={st.orderForm} onSubmit={handleSubmit(onSubmit)} ref={ref}>
      <TextInput
        placeholder="Номер договора"
        className={`${st.textInput} ${errors.name && st.error}`}
        {...register('orderNumber')}
      />
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
