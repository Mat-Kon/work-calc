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
import { IServiceItem } from '@/shared/types/calculate';
import { useEffect, useState } from 'react';
import { IServiceItemData } from '@/shared/types/my-services';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  serviceItem: IServiceItem | null;
}

export const AddServicePopup: React.FC<Props> = ({ isOpen, onClose, serviceItem }) => {
  const [services, setServices] = useState<IServiceItemData[]>([]);
  const [serviceNames, setServicesName] = useState<string[]>([]);

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
      nameService: serviceItem?.nameService ?? '',
    },
  });

  useEffect(() => {
    const myServiceList = getMyServicesList();
    if (myServiceList) {
      const names = myServiceList.map((service) => service.nameService);
      setServices(myServiceList);
      setServicesName(names);
    }
  }, [isOpen]);

  const onSubmit = (data: FormDataAddServiceCalc) => {
    const curService = services.find((service) => service.nameService === data.nameService);
    const costPerUnit = curService?.costPerUnit ?? 0;
    const typeValue = curService?.typeValue ?? '';
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
          <CalcSelect
            id="typeService"
            optionValues={serviceNames ?? []}
            {...register('nameService')}
          />

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
