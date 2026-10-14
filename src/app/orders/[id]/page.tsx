"use client";

import { type NextPage } from "next";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  OrderInfo,
  OrderStatusActions,
  OrderTotals,
  ServiceViewTable,
} from "@/features/orders";
import { PrintOrderButton } from "@/features/print-order";
import { ordersApi } from "@/shared/api";
import { PageHeading } from "@/shared/page-heading";
import { type Order } from "@/shared/types/calculate";

import st from "./index.module.scss";

const OrderPage: NextPage = () => {
  const params = useParams();
  const orderId = typeof params?.id === "string" ? params.id : null;

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) return;

    let cancelled = false;

    ordersApi
      .get(orderId)
      .then((data) => {
        if (!cancelled) setOrder(data);
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [orderId]);

  if (isLoading) return <p className={st.state}>Загрузка...</p>;
  if (error || !order) {
    return (
      <p className={st.state} role="alert">
        Заказ не найден
      </p>
    );
  }

  const heading = order.orderNumber
    ? `Номер договора ${order.orderNumber}`
    : "Заказ";

  return (
    <>
      <PageHeading text={heading} hasButton />

      <div className="print-area">
        <OrderInfo order={order} />
        <ServiceViewTable items={order.items} />
        <OrderTotals order={order} />
      </div>

      <div className={`${st.actions} no-print`}>
        <OrderStatusActions order={order} onChanged={setOrder} />
        <PrintOrderButton />
      </div>
    </>
  );
};

export default OrderPage;
