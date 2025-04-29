'use client';
import { BaseBtn } from '@/shared/buttons';
import { PageHeading } from '@/shared/page-heading';
import { IOrder, ICalcItem } from '@/shared/types/calculate';
import { AddOrderForm, AddServicePopup, ServiceTable } from '@/widgets/calculate';
import { type NextPage } from 'next';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import st from './index.module.scss';
import { getOrdersList } from '@/features/orders/model';

const OrderEditPage: NextPage = () => {
  const params = useParams();
  const orderId = params?.id ?? null;

  const [isOpenPopup, setOpenPopup] = useState(false);
  const [serviceData, setServiceData] = useState<ICalcItem | null>(null);
  const [orderData, setOrderData] = useState<IOrder | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleClickAddBtn = () => {
    setOpenPopup(true);
  };

  const handleClickEdit = (serviceData: ICalcItem) => {
    setOpenPopup(true);
    setServiceData(serviceData);
  };

  const handleClickCloseBtn = () => {
    setOpenPopup(false);
  };

  const handleClickSaveOrder = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { bubbles: true }));
    }
  };

  useEffect(() => {
    const localOrdersList = getOrdersList();
    if (localOrdersList && orderId) {
      const order = localOrdersList.find((order) => order.id === orderId);
      setOrderData(order ?? null);
    }
  }, [orderId]);

  return (
    <>
      <PageHeading text={`Редактирование заказа ${orderData?.orderNumber ?? ''}`} hasButton />
      <div className={st.calc}>
        <AddOrderForm ref={formRef} order={orderData} />

        <nav className={st.calc__toolbar}>
          <button className={st.calc__add} onClick={handleClickAddBtn}>
            Добавить услугу
          </button>
        </nav>

        <ServiceTable setServiceData={handleClickEdit} isOpen={isOpenPopup} />

        <BaseBtn text="Сохранить" className={st.calc__add} onClick={handleClickSaveOrder} />

        {isOpenPopup && (
          <AddServicePopup
            isOpen={isOpenPopup}
            onClose={handleClickCloseBtn}
            serviceItem={serviceData}
          />
        )}
      </div>
    </>
  );
};

export default OrderEditPage;
