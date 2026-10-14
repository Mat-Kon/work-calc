import { BaseBtn } from '@/shared/buttons/base';
import { TextInput } from '@/shared/inputs';
import { PopupWrapper } from '@/shared/popups';
import st from './index.module.scss';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormDataAddMyServiceForm, schemaAddServiceForm } from './model';
import { IServiceItemData } from '@/shared/types/my-services';
import { SelectMeasure } from '@/shared/select-measure';
import { catalogApi } from '@/shared/api';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  serviceItem: IServiceItemData | null;
}

export const AddMyServiceForm: React.FC<Props> = ({ isOpen, onClose, serviceItem }) => {
  const btnName = serviceItem ? 'Изменить' : 'Добавить';
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataAddMyServiceForm>({
    resolver: yupResolver(schemaAddServiceForm),
    defaultValues: {
      name: serviceItem?.name ?? '',
      costPerUnit: serviceItem?.costPerUnit ?? 0,
    },
  });

  const onSubmit = async (data: FormDataAddMyServiceForm) => {
    try {
      if (serviceItem) {
        await catalogApi.update(serviceItem.id, data);
      } else {
        await catalogApi.add('SERVICE', data);
      }
      onClose();
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : 'Не удалось сохранить');
    }
  };

  return (
    <PopupWrapper isOpen={isOpen}>
      <div className={st.wrapCloseBtn}>
        <BaseBtn text="Закрыть" className={st.closeBtn} onClick={onClose} />
      </div>
      <form className={st.addService} onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          placeholder="Название услуги"
          id="nameService"
          {...register('name')}
          className={`${st.serviceInput} ${!!errors.name ? st.error : ''}`}
        />

        <SelectMeasure id="typeValue" {...register('typeValue')} />
        <TextInput
          {...register('costPerUnit', { required: true })}
          type="number"
          step="any"
          className={`${st.serviceInput} ${!!errors.costPerUnit ? st.error : ''}`}
        />
        {submitError && <p role="alert">{submitError}</p>}
        <BaseBtn text={btnName} className={st.addService__btn} />
      </form>
    </PopupWrapper>
  );
};
