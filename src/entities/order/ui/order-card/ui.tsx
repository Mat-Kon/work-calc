import Link from "next/link";

import { type OrderSummary } from "@/shared/types/calculate";

import { StatusBadge } from "../status-badge/ui";

import st from "./index.module.scss";

interface OrderCardProps {
  order: OrderSummary;
}

const formatPrice = (value: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(value);

const formatDate = (value?: string) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "short",
  }).format(date);
};

export function OrderCard({ order }: OrderCardProps) {
  const date = formatDate(order.meetingDateTime ?? order.startWorkDate);

  return (
    <Link href={`/orders/${order.id}`} className={st.card}>
      <div className={st.head}>
        <span className={st.number}>
          {order.orderNumber ? `№ ${order.orderNumber}` : "Без номера"}
        </span>
        <StatusBadge status={order.status} />
      </div>

      <h3 className={st.name}>{order.name}</h3>

      <p className={st.address}>{order.address}</p>

      <div className={st.footer}>
        <span className={st.cost}>{formatPrice(order.totalCost)}</span>
        {date ? <span className={st.date}>{date}</span> : null}
      </div>
    </Link>
  );
}
