import { IMaterialItemData } from '@/shared/types/materials';
import { PopupWrapper } from '@/shared/popups';
import { BaseBtn } from '@/shared/buttons';
import { TextInput } from '@/shared/inputs';
import { SelectMeasure } from '@/shared/select-measure';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormDataAddMaterial, schemaAddMaterialForm } from './model';
import { catalogApi } from '@/shared/api';
import st from './index.module.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  materialItem: IMaterialItemData | null;
}

export const AddMaterialForm: React.FC<Props> = ({ isOpen, materialItem, onClose }) => {
  const btnName = materialItem ? 'Изменить' : 'Добавить';
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataAddMaterial>({
    resolver: yupResolver(schemaAddMaterialForm),
    defaultValues: {
      name: materialItem?.name ?? '',
      costPerUnit: materialItem?.costPerUnit ?? 0,
    },
  });

  const onSubmit = async (data: FormDataAddMaterial) => {
    try {
      if (materialItem) {
        await catalogApi.update(materialItem.id, data);
      } else {
        await catalogApi.add('MATERIAL', data);
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
          placeholder="Название материала"
          id="name"
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
