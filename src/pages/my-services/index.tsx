import st from './index.module.scss';
import { type NextPage } from 'next';
import { useState } from 'react';
import { IServiceItemData } from '@/shared/types/my-services';
import { AddMyServiceFrom, TableServices } from '@/widgets/my-services';

const MyServices: NextPage = () => {
  const [isOpenPopup, setOpenPopup] = useState(false);
  const [serviceData, setServiceData] = useState<IServiceItemData | null>(null);

  const handleClickAddBtn = () => {
    setOpenPopup(true);
  };

  const handleClickEdit = (serviceData: IServiceItemData) => {
    setOpenPopup(true);
    setServiceData(serviceData);
  };

  const handleClickCloseBtn = () => {
    setOpenPopup(false);
    setServiceData(null);
  };

  return (
    <div className={st.myService}>
      <h1 className={st.heading}>Мои услуги</h1>

      <nav className={st.myService__toolbar}>
        <button className={st.myService__add} onClick={handleClickAddBtn}>
          Добавить услугу
        </button>
      </nav>

      <TableServices setServiceData={handleClickEdit} isOpen={isOpenPopup} />

      {isOpenPopup && (
        <AddMyServiceFrom
          isOpen={isOpenPopup}
          onClose={handleClickCloseBtn}
          serviceItem={serviceData}
        />
      )}
    </div>
  );
};

export default MyServices;
