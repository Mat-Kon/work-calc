'use client';
import { CalcSelect } from '@/features/calculate';
import { BaseBtn } from '@/shared/buttons/base';
import { TextInput } from '@/shared/inputs';
import { PopupWrapper } from '@/shared/popups';
import st from './index.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  addServiceItem,
  FormDataAddServiceCalc,
  getMyServicesList,
  schemaAddServiceForm,
  updateServiceItem,
} from './model';
import { v4 as uuidv4 } from 'uuid';
import { ICalcItem } from '@/shared/types/calculate';
import { useEffect, useState } from 'react';
import { IServiceItemData } from '@/shared/types/my-services';
import { getMaterialsList } from '@/widgets/materials/model';
import { IMaterialItemData } from '@/shared/types/materials';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  serviceItem: ICalcItem | null;
}

export const AddServicePopup: React.FC<Props> = ({ isOpen, onClose, serviceItem }) => {
  const [services, setServices] = useState<IServiceItemData[]>([]);
  const [materials, setMaterials] = useState<IMaterialItemData[]>([]);
  const [names, setName] = useState<string[]>([]);

  const btnName = serviceItem ? 'Обновить' : 'Добавить';
  const hasServices = services.length > 0;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataAddServiceCalc>({
    resolver: yupResolver(schemaAddServiceForm),
    defaultValues: {
      count: serviceItem?.count ?? 0,
      name: serviceItem?.name ?? '',
    },
  });

  useEffect(() => {
    const myServiceList = getMyServicesList();
    const myMaterialsList = getMaterialsList();
    if (myServiceList) {
      const serviceNames = myServiceList.map((service) => service.name);
      setServices(myServiceList);
      setName(serviceNames);
    }

    if (myMaterialsList) {
      const materialNames = myMaterialsList.map((mat) => mat.name);
      setMaterials(myMaterialsList);
      setName((prev) => [...prev, ...materialNames]);
    }
  }, [isOpen]);

  const onSubmit = (data: FormDataAddServiceCalc) => {
    const curItem =
      services.find((service) => service.name === data.name) ??
      materials.find((mat) => mat.name === data.name);
    const costPerUnit = curItem?.costPerUnit ?? 0;
    const typeValue = curItem?.typeValue ?? '';
    const totalCost = data.count * costPerUnit;
    if (serviceItem) {
      const serviceData = { ...data, id: serviceItem.id, costPerUnit, cost: totalCost, typeValue };
      updateServiceItem(serviceData);
    } else {
      const serviceId = uuidv4();
      const serviceData = { id: serviceId, ...data, costPerUnit, cost: totalCost, typeValue };
      addServiceItem(serviceData);
    }
    onClose();
  };

  return (
    <PopupWrapper isOpen={isOpen}>
      <div className={st.wrapCloseBtn}>
        <BaseBtn text="Закрыть" className={st.closeBtn} onClick={onClose} />
      </div>
      {hasServices ? (
        <form className={st.addService} onSubmit={handleSubmit(onSubmit)}>
          <CalcSelect id="typeService" optionValues={names ?? []} {...register('name')} />

          <TextInput
            {...register('count', { required: true })}
            type="number"
            step="any"
            className={`${st.serviceValue} ${!!errors.count ? st.error : ''}`}
          />
          <BaseBtn text={btnName} className={st.addService__btn} />
        </form>
      ) : (
        <p>Добавьте хотя бы одну услугу в &quot;Мои услуги&quot;</p>
      )}
    </PopupWrapper>
  );
};
