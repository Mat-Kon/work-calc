import { CalcSelect } from '@/features/calculate';
import { BaseBtn } from '@/shared/buttons/base';
import { TextInput } from '@/shared/inputs';
import { PopupWrapper } from '@/shared/popup-wrapper';
import * as yup from 'yup';
import st from './index.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addServiceItem, updateServiceItem } from './model';
import { v4 as uuidv4 } from 'uuid';
import { TServiceItem } from '@/shared/types/calculate';
import { useEffect } from 'react';

//TODO: change when add db
const servesTypes = ['Монтаж пола', 'Отделка стен', 'Установка окна'];
const typeValues = ['п.м', 'м2', 'за услугу'];

export const schemaAddServiceForm = yup.object({
  typeService: yup.string().required(),
  typeValue: yup.string().required(),
  value: yup.number().min(1).required(),
  cost: yup.number(),
  costPerUnit: yup.number(),
});

type FormData = yup.InferType<typeof schemaAddServiceForm>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  serviceItem: TServiceItem | null;
}

export const AddServicePopup: React.FC<Props> = ({ isOpen, onClose, serviceItem }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaAddServiceForm),
  });

  useEffect(() => {
    if (serviceItem) {
      reset({ ...serviceItem });
    } else {
      reset({
        typeService: servesTypes[0],
        typeValue: typeValues[0],
        value: 0,
        cost: 0,
        costPerUnit: 0,
      });
    }
  }, [serviceItem, reset]);

  const onSubmit = (data: FormData) => {
    //TODO: delete hardcode after create BD services
    const costPerUnit = 10;
    const totalCost = data.value * costPerUnit;
    if (serviceItem) {
      const serviceData = { ...data, id: serviceItem.id, costPerUnit, cost: totalCost };
      updateServiceItem(serviceData);
    } else {
      const serviceId = uuidv4();
      const serviceData = { id: serviceId, ...data, costPerUnit, cost: totalCost };
      addServiceItem(serviceData);
    }
    onClose();
  };

  return (
    <PopupWrapper isOpen={isOpen}>
      <form className={st.addService} onSubmit={handleSubmit(onSubmit)}>
        <CalcSelect id="typeService" optionValues={servesTypes} {...register('typeService')} />

        <CalcSelect id="typeValue" optionValues={typeValues} {...register('typeValue')} />
        <TextInput
          {...register('value', { required: true })}
          type="number"
          className={`${st.serviceValue} ${!!errors.value ? st.error : ''}`}
        />
        <BaseBtn text="Добавить" className={st.addService__btn} />
      </form>
    </PopupWrapper>
  );
};
