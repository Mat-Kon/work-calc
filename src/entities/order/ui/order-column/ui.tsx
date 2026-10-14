import { type OrderStatus, type OrderSummary } from "@/shared/types/calculate";

import { OrderCard } from "../order-card/ui";

import st from "./index.module.scss";

interface OrderColumnProps {
  status: OrderStatus;
  title: string;
  orders: OrderSummary[];
  emptyText?: string;
}

export function OrderColumn({
  status,
  title,
  orders,
  emptyText = "Пока пусто",
}: OrderColumnProps) {
  return (
    <section className={st.column} data-status={status}>
      <header className={st.head}>
        <h2 className={st.title}>{title}</h2>
        <span className={st.count}>{orders.length}</span>
      </header>

      {orders.length === 0 ? (
        <p className={st.empty}>{emptyText}</p>
      ) : (
        <ul className={st.list}>
          {orders.map((order) => (
            <li key={order.id}>
              <OrderCard order={order} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
