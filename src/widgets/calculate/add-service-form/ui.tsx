'use client';
import { CalcSelect } from '@/features/calculate';
import { BaseBtn } from '@/shared/buttons/base';
import { TextInput } from '@/shared/inputs';
import { PopupWrapper } from '@/shared/popup-wrapper';
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
import { TServiceItem } from '@/shared/types/calculate';
import { useEffect, useState } from 'react';
import { MY_SERVICES_LIST_NAME } from '@/shared/constants/my-service-page';
import { IServiceItemData } from '@/shared/types/my-services';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  serviceItem: TServiceItem | null;
}

export const AddServicePopup: React.FC<Props> = ({ isOpen, onClose, serviceItem }) => {
  const [services, setServices] = useState<IServiceItemData[]>([]);
  const [serviceNames, setServicesName] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataAddServiceCalc>({
    resolver: yupResolver(schemaAddServiceForm),
  });

  useEffect(() => {
    const storageServiceList = localStorage.getItem(MY_SERVICES_LIST_NAME);
    if (storageServiceList) {
      const myServicesList: IServiceItemData[] = JSON.parse(storageServiceList);

      const names = myServicesList.map((service) => service.nameService);
      setServices(myServicesList);
      setServicesName(names);
    }
  }, [isOpen]);

  //TODO: remove useEffect
  useEffect(() => {
    if (serviceItem) {
      reset({ ...serviceItem });
    } else {
      reset({
        nameService: '',
        typeValue: '',
        value: 0,
        cost: 0,
        costPerUnit: 0,
      });
    }
  }, [serviceItem, reset]);

  const onSubmit = (data: FormDataAddServiceCalc) => {
    const curService = services.find((service) => service.nameService === data.nameService);
    const costPerUnit = curService?.costPerUnit ?? 0;
    const typeValue = curService?.typeValue ?? '';
    const totalCost = data.value * costPerUnit;
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
      <form className={st.addService} onSubmit={handleSubmit(onSubmit)}>
        <CalcSelect
          id="typeService"
          optionValues={serviceNames ?? []}
          {...register('nameService')}
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
