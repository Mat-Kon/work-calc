import { IMaterialItemData } from '@/shared/types/materials';
import st from './index.module.scss';
import { PopupWrapper } from '@/shared/popups';
import { BaseBtn } from '@/shared/buttons';
import { TextInput } from '@/shared/inputs';
import { SelectMeasure } from '@/shared/select-measure';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormDataAddMaterial, schemaAddMaterialForm } from './model';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  materialItem: IMaterialItemData | null;
}

export const AddMaterialForm: React.FC<Props> = ({ isOpen, materialItem, onClose }) => {
  const btnName = materialItem ? 'Изменить' : 'Добавить';

  const {
    register,
    // handleSubmit,
    formState: { errors },
    /* eslint eqeqeq: "off", curly: "error" */
  } = useForm<FormDataAddMaterial>({
    resolver: yupResolver(schemaAddMaterialForm),
    defaultValues: {
      nameMaterial: materialItem?.nameMaterial ?? '',
      costPerUnit: materialItem?.costPerUnit ?? 0,
    },
  });

  return (
    <PopupWrapper isOpen={isOpen}>
      <div className={st.wrapCloseBtn}>
        <BaseBtn text="Закрыть" className={st.closeBtn} onClick={onClose} />
      </div>
      <form className={st.addService}>
        <TextInput
          placeholder="Название услуги"
          id="nameMaterial"
          {...register('nameMaterial')}
          className={`${st.serviceInput} ${!!errors.costPerUnit ? st.error : ''}`}
        />

        <SelectMeasure id="typeValue" {...register('typeValue')} />
        <TextInput
          {...register('costPerUnit', { required: true })}
          type="number"
          step="any"
          className={`${st.serviceInput} ${!!errors.costPerUnit ? st.error : ''}`}
        />
        <BaseBtn text={btnName} className={st.addService__btn} />
      </form>
    </PopupWrapper>
  );
};
