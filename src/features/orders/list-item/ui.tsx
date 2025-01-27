import { IOrder } from '@/shared/types/calculate';
import st from './index.module.scss';
import Link from 'next/link';
import { IconBtn } from '@/shared/buttons';
import { EditIcon, TrashIcon } from '@/shared/icons';

interface Props {
  order: IOrder;
  orderNumber: number;
  onDelete: () => void;
}
export const OrderListItem: React.FC<Props> = ({ order, orderNumber, onDelete }) => {
  const { name, address, phoneNumber } = order;

  return (
    <div className={st.item}>
      <Link href={`/orders/${order.id}`} className={st.item__link}>
        <span className={st.item__number}>{orderNumber}</span>
        <div className={st.item__info}>
          <h3>{address}</h3>
          <h4>{name}</h4>
          <p>
            {`Контакт: `}
            <span>{phoneNumber}</span>
          </p>
        </div>
      </Link>
      <div className={st.item__btnsWrapper}>
        <Link href={`/orders/${order.id}/edit`}>
          <EditIcon />
        </Link>

        <IconBtn title="Удалить" onClick={onDelete}>
          <TrashIcon />
        </IconBtn>
      </div>
    </div>
  );
};
