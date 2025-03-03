import { IOrder } from '@/shared/types/calculate';
import st from './index.module.scss';

interface Props {
  order: IOrder;
}

export const OrderInfo: React.FC<Props> = ({ order }) => {
  const { address, meetingDateTime, name, phoneNumber, startWorkDate } = order;

  return (
    <div className={st.orderInfo}>
      <p>
        <strong>Адрес:</strong>
        {`${address}`}
      </p>
      <p>
        <strong>Номер телефона:</strong>
        {`${phoneNumber}`}
      </p>
      <p>
        <strong>ФИО:</strong>
        {`${name}`}
      </p>
      <p>
        <strong>Дата замера:</strong>
        {`${new Date(meetingDateTime).toLocaleString('ru-RU')}`}
      </p>
      <p>
        <strong>Дата начала:</strong>
        {`${new Date(startWorkDate).toLocaleString('ru-RU')}`}
      </p>
    </div>
  );
};
