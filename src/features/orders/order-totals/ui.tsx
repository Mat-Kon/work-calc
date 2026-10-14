import { calcOrderTotals } from "@/shared/lib/order-calc";
import { type Order } from "@/shared/types/calculate";

import st from "./index.module.scss";

interface OrderTotalsProps {
  order: Order;
}

const formatPrice = (value: number) =>
  value.toLocaleString("ru-RU", { style: "currency", currency: "RUB" });

export function OrderTotals({ order }: OrderTotalsProps) {
  const totals = calcOrderTotals(
    order.items,
    order.discountPercent,
    order.isPrepaid,
  );
  const hasDiscount = totals.discountAmount > 0;

  return (
    <div className={st.totals}>
      <div className={st.row}>
        <span>Подытог</span>
        <span>{formatPrice(totals.subtotal)}</span>
      </div>

      {hasDiscount ? (
        <div className={`${st.row} ${st.discount}`}>
          <span>Скидка {order.discountPercent}%</span>
          <span>−{formatPrice(totals.discountAmount)}</span>
        </div>
      ) : null}

      <div className={`${st.row} ${st.total}`}>
        <span>Итого</span>
        <span>{formatPrice(totals.total)}</span>
      </div>

      {order.isPrepaid ? (
        <>
          <div className={st.row}>
            <span>Предоплата 50%</span>
            <span>{formatPrice(totals.prepayment)}</span>
          </div>
          <div className={`${st.row} ${st.toPay}`}>
            <span>К оплате</span>
            <span>{formatPrice(totals.toPay)}</span>
          </div>
        </>
      ) : null}
    </div>
  );
}
