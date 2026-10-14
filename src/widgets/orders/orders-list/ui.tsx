import { OrderListItem } from '@/features/orders';
import { IOrder } from '@/shared/types/calculate';
import { useState } from 'react';
import st from './index.module.scss';
import { PopupConfirmation } from '@/shared/popups';
import { ordersApi } from '@/shared/api';

interface Props {
  orders: IOrder[];
  onDeleted: (id: string) => void;
}

export const OrdersList: React.FC<Props> = ({ orders, onDeleted }) => {
  const [isOpen, setOpen] = useState(false);
  const [deleteOrderData, setOrderData] = useState<IOrder | null>(null);

  const onReject = () => {
    setOrderData(null);
    setOpen(false);
  };

  const onConfirm = async () => {
    if (deleteOrderData) {
      try {
        await ordersApi.remove(deleteOrderData.id);
        onDeleted(deleteOrderData.id);
      } catch {
        alert('Не удалось удалить заказ');
      }
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
          text={`Удалить заказ ${deleteOrderData?.address} ?`}
          isOpen={isOpen}
          confirm={onConfirm}
          reject={onReject}
        />
      )}
    </div>
  );
};
