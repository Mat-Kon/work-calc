"use client";

import { useEffect, useMemo, useState } from "react";

import { searchOrdersByAddress, sortOrders } from "@/features/orders/model";
import { ordersApi } from "@/shared/api";
import { PageHeading } from "@/shared/page-heading";
import { type OrderSummary } from "@/shared/types/calculate";
import { OrdersList, SearchOrder, SelectSort } from "@/widgets/orders";

import st from "./index.module.scss";

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortValue, setSortValue] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    ordersApi
      .list()
      .then((data) => {
        if (cancelled) return;
        setOrders(data);
        setError("");
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
  }, []);

  const visibleOrders = useMemo(
    () => sortOrders(searchOrdersByAddress(orders, search), sortValue),
    [orders, search, sortValue],
  );

  const handleDeleted = (id: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  return (
    <>
      <PageHeading text="Созданные заказы" />

      <nav className={st.navbar}>
        <SelectSort onChange={setSortValue} />
        <SearchOrder value={search} onChange={setSearch} />
      </nav>

      {isLoading ? <p className={st.state}>Загрузка...</p> : null}
      {error ? (
        <p className={st.state} role="alert">
          Ошибка: {error}
        </p>
      ) : null}
      {!isLoading && !error && orders.length === 0 ? (
        <p className={st.state}>Заказов пока нет</p>
      ) : null}
      {!isLoading && orders.length > 0 && visibleOrders.length === 0 ? (
        <p className={st.state}>Ничего не найдено</p>
      ) : null}

      <OrdersList orders={visibleOrders} onDeleted={handleDeleted} />
    </>
  );
}
