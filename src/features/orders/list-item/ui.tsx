import Link from "next/link";

import { IconBtn } from "@/shared/buttons/icon-btn";
import { EditIcon, TrashIcon } from "@/shared/icons";
import { type OrderSummary } from "@/shared/types/calculate";

import st from "./index.module.scss";

interface OrderListItemProps {
  order: OrderSummary;
  orderNumber: number;
  onDelete: () => void;
}

export function OrderListItem({
  order,
  orderNumber,
  onDelete,
}: OrderListItemProps) {
  const { id, name, address, phoneNumber } = order;

  return (
    <div className={st.item}>
      <Link href={`/orders/${id}`} className={st.link}>
        <span className={st.number}>{orderNumber}</span>
        <div className={st.info}>
          <h3>{address}</h3>
          <h4>{name}</h4>
          <p>
            Контакт: <span>{phoneNumber}</span>
          </p>
        </div>
      </Link>

      <div className={st.actions}>
        <Link href={`/orders/${id}/edit`} aria-label="Редактировать">
          <EditIcon />
        </Link>

        <IconBtn title="Удалить" onClick={onDelete}>
          <TrashIcon />
        </IconBtn>
      </div>
    </div>
  );
}
