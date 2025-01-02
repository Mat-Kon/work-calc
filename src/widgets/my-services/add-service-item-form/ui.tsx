import { BaseBtn } from '@/shared/buttons/base';
import { TextInput } from '@/shared/inputs';
import { PopupWrapper } from '@/shared/popup-wrapper';
import st from './index.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  addServiceItem,
  FormDataAddServiceItemData,
  schemaAddServiceForm,
  updateServiceItem,
} from './model';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { IServiceItemData } from '@/shared/types/my-services';
import { SelectMeasure } from '@/shared/select-measure';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  serviceItem: IServiceItemData | null;
}

export const AddServiceItemData: React.FC<Props> = ({ isOpen, onClose, serviceItem }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataAddServiceItemData>({
    resolver: yupResolver(schemaAddServiceForm),
  });

  //TODO: remove useEffect
  useEffect(() => {
    if (serviceItem) {
      reset({ ...serviceItem });
    } else {
      reset({
        nameService: '',
        typeValue: '',
        costPerUnit: 0,
      });
    }
  }, [serviceItem, reset]);

  const onSubmit = (data: FormDataAddServiceItemData) => {
    if (serviceItem) {
      const serviceData = { ...data, id: serviceItem.id };
      updateServiceItem(serviceData);
    } else {
      const serviceId = uuidv4();
      const serviceData = { id: serviceId, ...data };
      addServiceItem(serviceData);
    }
    onClose();
  };

  return (
    <PopupWrapper isOpen={isOpen}>
      <div className={st.wrapCloseBtn}>
        <BaseBtn text="Закрыть" className={st.closeBtn} onClick={onClose} />
      </div>
      <form className={st.addService} onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          id="nameService"
          {...register('nameService')}
          className={`${st.serviceInput} ${!!errors.costPerUnit ? st.error : ''}`}
        />

        <SelectMeasure id="typeValue" {...register('typeValue')} />
        <TextInput
          {...register('costPerUnit', { required: true })}
          type="number"
          step="any"
          className={`${st.serviceInput} ${!!errors.costPerUnit ? st.error : ''}`}
        />
        <BaseBtn text="Добавить" className={st.addService__btn} />
      </form>
    </PopupWrapper>
  );
};
