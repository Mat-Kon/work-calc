import { IMaterialItemData } from '@/shared/types/materials';
import { PopupWrapper } from '@/shared/popups';
import { BaseBtn } from '@/shared/buttons';
import { TextInput } from '@/shared/inputs';
import { SelectMeasure } from '@/shared/select-measure';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  addMaterialItem,
  FormDataAddMaterial,
  schemaAddMaterialForm,
  updateMaterialItem,
} from './model';
import { v4 as uuidv4 } from 'uuid';
import st from './index.module.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  materialItem: IMaterialItemData | null;
}

export const AddMaterialForm: React.FC<Props> = ({ isOpen, materialItem, onClose }) => {
  const btnName = materialItem ? 'Изменить' : 'Добавить';

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

  const onSubmit = (data: FormDataAddMaterial) => {
    if (materialItem) {
      const serviceData = { ...data, id: materialItem.id };
      updateMaterialItem(serviceData);
    } else {
      const materilId = uuidv4();
      const serviceData = { id: materilId, ...data };
      addMaterialItem(serviceData);
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
          placeholder="Название услуги"
          id="name"
          {...register('name')}
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
