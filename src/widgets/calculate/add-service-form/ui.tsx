import { CalcSelect } from '@/features/calculate';
import { BaseBtn } from '@/shared/buttons/base';
import { TextInput } from '@/shared/inputs';
import { PopupWrapper } from '@/shared/popup-wrapper';
import * as yup from 'yup';
import st from './index.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { handleAddService } from './model';
import { v4 as uuidv4 } from 'uuid';

//TODO: change when add db
const servesTypes = ['Монтаж пола', 'Отделка стен', 'Установка окна'];
const typeValues = ['п.м', 'м2', 'за услугу'];

export const schemaAddServiceForm = yup.object({
  typeService: yup.string().required(),
  typeValue: yup.string().required(),
  value: yup.number().required(),
});

type FormData = yup.InferType<typeof schemaAddServiceForm>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddServicePopup: React.FC<Props> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaAddServiceForm),
  });

  const onSubmit = (data: FormData) => {
    //TODO: delete hardcode after create BD services
    const costPerUnit = 10;
    const totalCost = data.value * costPerUnit;
    const serviceId = uuidv4();
    const serviceData = { id: serviceId, ...data, costPerUnit, cost: totalCost };
    handleAddService(serviceData);
    onClose();
    reset();
  };

  return (
    <PopupWrapper isOpen={isOpen}>
      <form className={st.addService} onSubmit={handleSubmit(onSubmit)}>
        <CalcSelect
          id="typeService"
          optionValues={servesTypes}
          defaultValue={servesTypes[0]}
          {...register('typeService')}
        />

        <CalcSelect
          id="typeValue"
          optionValues={typeValues}
          defaultValue={typeValues[0]}
          {...register('typeValue')}
        />
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
