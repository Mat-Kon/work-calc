import { type Order } from "@/shared/types/calculate";

import st from "./index.module.scss";

interface OrderInfoProps {
  order: Order;
}

const formatDate = (value: string) => new Date(value).toLocaleString("ru-RU");

export function OrderInfo({ order }: OrderInfoProps) {
  const { address, meetingDateTime, name, phoneNumber, startWorkDate } = order;

  return (
    <div className={st.orderInfo}>
      <p>
        <strong>Адрес:</strong> {address}
      </p>
      <p>
        <strong>Номер телефона:</strong> {phoneNumber}
      </p>
      <p>
        <strong>ФИО:</strong> {name}
      </p>
      <p>
        <strong>Дата замера:</strong> {formatDate(meetingDateTime)}
      </p>
      <p>
        <strong>Дата начала:</strong> {formatDate(startWorkDate)}
      </p>
    </div>
  );
}
