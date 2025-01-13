import { type NextPage } from 'next';
import { useParams } from 'next/navigation';

const OrderPage: NextPage = () => {
  const { id } = useParams();
  const orderId = id ?? null;
  return orderId ? <h1>Заказ {orderId}</h1> : null;
};

export default OrderPage;
