import { IOrder } from "@/shared/types/calculate";
import st from "./index.module.scss";

interface Props {
  order?: IOrder | null;
}

export const PrintHeader: React.FC<Props> = ({ order }) => {
  if (!order) return null;

  return (
    <div className={st.printHeader}>
      <h1>Смета на работы</h1>
      {order.orderNumber && <p>Договор № {order.orderNumber}</p>}
      <p>
        <strong>Заказчик:</strong> {order.name}
      </p>
      <p>
        <strong>Адрес:</strong> {order.address}
      </p>
      <p>
        <strong>Телефон:</strong> {order.phoneNumber}
      </p>
    </div>
  );
};
