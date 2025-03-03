import { OrderInfo, ServiceViewTable } from '@/features/orders';
import { getOrderById } from '@/features/orders/model';
import { PageHeading } from '@/shared/page-heading';
import { IOrder } from '@/shared/types/calculate';
import { type NextPage } from 'next';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const OrderPage: NextPage = () => {
  const params = useParams();
  const [order, setOrder] = useState<IOrder | null>(null);
  const orderId = params?.id ?? null;

  useEffect(() => {
    if (orderId) {
      const order = getOrderById(orderId);
      if (order) {
        setOrder(order);
      }
    }
  }, [orderId]);

  return order ? (
    <>
      <PageHeading text={`Номер договора ${order.orderNumber}`} hasButton />
      <OrderInfo order={order} />
      <ServiceViewTable servicesList={order.orderServices} />
    </>
  ) : null;
};

export default OrderPage;
