import st from './index.module.scss';
import { type NextPage } from 'next';
import { useState } from 'react';
import { IServiceItemData } from '@/shared/types/my-services';
import { AddMyServiceFrom, TableServices } from '@/widgets/my-services';
import { BaseBtn } from '@/shared/buttons/base';
import { PageHeading } from '@/shared/page-heading';

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

  //TODO: add sort for services
  return (
    <>
      <PageHeading text="Мои услуги" />
      <div className={st.myService}>
        <nav className={st.myService__toolbar}>
          <BaseBtn
            text="Добавить услугу"
            className={st.myService__add}
            onClick={handleClickAddBtn}
          />
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
    </>
  );
};

export default MyServices;
