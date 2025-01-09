import { AddServicePopup } from '@/widgets/calculate/add-service-form';
import st from './index.module.scss';
import { type NextPage } from 'next';
import { useRef, useState } from 'react';
import { ServiceTable } from '@/widgets/calculate/services-table';
import { IServiceItem } from '@/shared/types/calculate';
import { BaseBtn } from '@/shared/buttons/base';
import { AddOrderForm } from '@/widgets/calculate';

const Calculate: NextPage = () => {
  const [isOpenPopup, setOpenPopup] = useState(false);
  const [serviceData, setServiceData] = useState<IServiceItem | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleClickAddBtn = () => {
    setOpenPopup(true);
  };

  const handleClickEdit = (serviceData: IServiceItem) => {
    setOpenPopup(true);
    setServiceData(serviceData);
  };

  const handleClickCloseBtn = () => {
    setOpenPopup(false);
    setServiceData(null);
  };

  const handleClickSaveOrder = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { bubbles: true }));
    }
  };

  return (
    <div className={st.calc}>
      <AddOrderForm ref={formRef} />
      <h1 className={st.heading}>Расчет стоимости</h1>

      <nav className={st.calc__toolbar}>
        <button className={st.calc__add} onClick={handleClickAddBtn}>
          Добавить услугу
        </button>
      </nav>

      {!isOpenPopup && <ServiceTable setServiceData={handleClickEdit} />}

      <BaseBtn text="Сохранить" className={st.calc__add} onClick={handleClickSaveOrder} />

      {isOpenPopup && (
        <AddServicePopup
          isOpen={isOpenPopup}
          onClose={handleClickCloseBtn}
          serviceItem={serviceData}
        />
      )}
    </div>
  );
};

export default Calculate;
