'use client';
import { OrderInfo, ServiceViewTable } from '@/features/orders';
import { ordersApi } from '@/shared/api';
import { PageHeading } from '@/shared/page-heading';
import { IOrder } from '@/shared/types/calculate';
import { type NextPage } from 'next';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const OrderPage: NextPage = () => {
  const params = useParams();
  const orderId = typeof params?.id === 'string' ? params.id : null;
  const [order, setOrder] = useState<IOrder | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!orderId) return;
    let cancelled = false;

    ordersApi
      .get(orderId)
      .then((data) => {
        if (!cancelled) setOrder(data);
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [orderId]);

  if (isLoading) return <p>Загрузка...</p>;
  if (error || !order) return <p role="alert">Заказ не найден</p>;

  return (
    <>
      <PageHeading text={`Номер договора ${order.orderNumber ?? ''}`} hasButton />
      <OrderInfo order={order} />
      <ServiceViewTable servicesList={order.orderServices} />
    </>
  );
};

export default OrderPage;
