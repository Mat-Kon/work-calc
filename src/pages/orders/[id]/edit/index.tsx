import { type NextPage } from 'next';
import { useParams } from 'next/navigation';

const OrderEditPage: NextPage = () => {
  const { id } = useParams();
  const orderId = id ?? null;
  return orderId ? <h1>Редактирование заказа {orderId}</h1> : null;
};

export default OrderEditPage;
