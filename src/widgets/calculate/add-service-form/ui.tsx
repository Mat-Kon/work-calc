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
  schemaAddServiceForm,
  updateServiceItem,
} from './model';
import { v4 as uuidv4 } from 'uuid';
import { ICalcItem } from '@/shared/types/calculate';
import { useEffect, useState } from 'react';
import { IServiceItemData } from '@/shared/types/my-services';
import { IMaterialItemData } from '@/shared/types/materials';
import { catalogApi } from '@/shared/api';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  serviceItem: ICalcItem | null;
}

export const AddServicePopup: React.FC<Props> = ({ isOpen, onClose, serviceItem }) => {
  const [services, setServices] = useState<IServiceItemData[]>([]);
  const [materials, setMaterials] = useState<IMaterialItemData[]>([]);

  const names = [...services, ...materials].map((item) => item.name);
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
    let cancelled = false;

    Promise.all([catalogApi.list('SERVICE'), catalogApi.list('MATERIAL')])
      .then(([serviceList, materialList]) => {
        if (cancelled) return;
        setServices(serviceList);
        setMaterials(materialList);
      })
      .catch(() => {
        // ошибка загрузки: покажем подсказку «Добавьте хотя бы одну услугу»
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  const onSubmit = (data: FormDataAddServiceCalc) => {
    const service = services.find((item) => item.name === data.name);
    const curItem = service ?? materials.find((item) => item.name === data.name);
    const kind = service ? ('SERVICE' as const) : ('MATERIAL' as const);
    const costPerUnit = curItem?.costPerUnit ?? 0;
    const typeValue = curItem?.typeValue ?? '';
    const totalCost = Math.round(data.count * costPerUnit * 100) / 100;

    if (serviceItem) {
      const serviceData = {
        ...data,
        id: serviceItem.id,
        costPerUnit,
        cost: totalCost,
        typeValue,
        kind,
      };
      updateServiceItem(serviceData);
    } else {
      const serviceData = {
        id: uuidv4(),
        ...data,
        costPerUnit,
        cost: totalCost,
        typeValue,
        kind,
      };
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
          <CalcSelect id="typeService" optionValues={names} {...register('name')} />

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
