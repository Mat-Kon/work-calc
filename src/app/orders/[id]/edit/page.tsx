'use client';
import { BaseBtn } from '@/shared/buttons';
import { PageHeading } from '@/shared/page-heading';
import { IOrder, ICalcItem } from '@/shared/types/calculate';
import { AddOrderForm, AddServicePopup, ServiceTable } from '@/widgets/calculate';
import { type NextPage } from 'next';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import st from './index.module.scss';
import { ordersApi } from '@/shared/api';
import { LOCAL_LIST_NAME } from '@/shared/constants/calculate-page';
import { removeCalcList } from '@/shared/helpers/functions';

const OrderEditPage: NextPage = () => {
  const params = useParams();
  const orderId = typeof params?.id === 'string' ? params.id : null;

  const [isOpenPopup, setOpenPopup] = useState(false);
  const [serviceData, setServiceData] = useState<ICalcItem | null>(null);
  const [orderData, setOrderData] = useState<IOrder | null>(null);
  const [error, setError] = useState('');
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
    setServiceData(null);
  };

  const handleClickSaveOrder = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { bubbles: true }));
    }
  };

  // Загружаем заказ с сервера и кладём его позиции в черновик расчёта.
  // Страница рисуется только после этого, поэтому таблица сразу видит позиции,
  // и редактирование работает даже при прямом открытии ссылки или обновлении страницы.
  useEffect(() => {
    if (!orderId) return;
    let cancelled = false;

    ordersApi
      .get(orderId)
      .then((order) => {
        if (cancelled) return;
        localStorage.setItem(LOCAL_LIST_NAME, JSON.stringify(order.orderServices));
        setOrderData(order);
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      });

    return () => {
      cancelled = true;
    };
  }, [orderId]);

  // Уходим со страницы без сохранения: чистим черновик, чтобы он не попал в «Рассчитать»
  useEffect(() => {
    return () => removeCalcList();
  }, []);

  if (error) return <p role="alert">Заказ не найден</p>;
  if (!orderData) return <p>Загрузка...</p>;

  return (
    <>
      <PageHeading text={`Редактирование заказа ${orderData.orderNumber ?? ''}`} hasButton />
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
