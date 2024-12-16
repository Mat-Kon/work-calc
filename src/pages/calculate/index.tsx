// 'use client';
import { AddServicePopup } from '@/widgets/calculate/add-service-form';
import st from './index.module.scss';
import { type NextPage } from 'next';
import { useState } from 'react';
import { ServiceTable } from '@/widgets/calculate/services-table';
import { TServiceItem } from '@/shared/types/calculate';

const Calculate: NextPage = () => {
  const [isOpenPopup, setOpenPopup] = useState(false);
  const [serviceData, setServiceData] = useState<TServiceItem | null>(null);

  const handleClickAddBtn = () => {
    setOpenPopup(true);
  };

  const handleClickEdit = (serviceData: TServiceItem) => {
    setOpenPopup(true);
    setServiceData(serviceData);
  };

  const handleClickCloseBtn = () => {
    setOpenPopup(false);
    setServiceData(null);
  };

  return (
    <div className={st.calc}>
      <h1 className={st.heading}>Расчет стоимости</h1>

      <nav className={st.calc__toolbar}>
        <button className={st.calc__add} onClick={handleClickAddBtn}>
          Добавить услугу
        </button>
      </nav>

      {!isOpenPopup && <ServiceTable setServiceData={handleClickEdit} />}

      <AddServicePopup
        isOpen={isOpenPopup}
        onClose={handleClickCloseBtn}
        serviceItem={serviceData}
      />
    </div>
  );
};

export default Calculate;
