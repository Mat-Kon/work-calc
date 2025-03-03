import { OrderListItem } from '@/features/orders';
import { IOrder } from '@/shared/types/calculate';
import { useEffect, useState } from 'react';
import st from './index.module.scss';
import { PopupConfirmation } from '@/shared/popups';
import { getOrdersList, removeOrderById } from '@/features/orders/model';

interface Props {
  updatedOrders?: IOrder[] | null;
}

export const OrdersList: React.FC<Props> = ({ updatedOrders }) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [DeleteOrderData, setOrderData] = useState<IOrder | null>(null);

  useEffect(() => {
    if (updatedOrders) {
      setOrders(updatedOrders);
    } else {
      const savedOrders = getOrdersList();
      setOrders(savedOrders ?? []);
    }
  }, [isOpen, updatedOrders]);

  const onReject = () => {
    setOrderData(null);
    setOpen(false);
  };

  const onConfirm = () => {
    if (DeleteOrderData) {
      removeOrderById(DeleteOrderData.id);
    }
    setOrderData(null);
    setOpen(false);
  };

  const onDeleteOrder = (order: IOrder) => {
    setOrderData(order);
    setOpen(true);
  };

  return (
    <div className={st.listWrapper}>
      <ul className={st.orderList}>
        {orders.map((order, index) => (
          <li key={order.id}>
            <OrderListItem
              order={order}
              orderNumber={index + 1}
              onDelete={() => onDeleteOrder(order)}
            />
          </li>
        ))}
      </ul>

      {isOpen && (
        <PopupConfirmation
          text={`Удалить заказ ${DeleteOrderData?.address} ?`}
          isOpen={isOpen}
          confirm={onConfirm}
          reject={onReject}
        />
      )}
    </div>
  );
};
