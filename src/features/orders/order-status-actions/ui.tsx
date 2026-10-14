"use client";

import { useState } from "react";

import { ordersApi } from "@/shared/api";
import { BaseBtn } from "@/shared/buttons/base";
import { type Order, type OrderStatus } from "@/shared/types/calculate";

import st from "./index.module.scss";

interface OrderStatusActionsProps {
  order: Order;
  onChanged?: (order: Order) => void;
}

interface StatusAction {
  status: OrderStatus;
  label: string;
  variant?: "primary" | "ghost";
}

const ACTIONS: StatusAction[] = [
  { status: "QUEUED", label: "В очередь", variant: "ghost" },
  { status: "IN_PROGRESS", label: "В работу", variant: "ghost" },
  { status: "DONE", label: "Завершить" },
];

export function OrderStatusActions({
  order,
  onChanged,
}: OrderStatusActionsProps) {
  const [pending, setPending] = useState<OrderStatus | null>(null);
  const [error, setError] = useState("");

  const handleClick = async (status: OrderStatus) => {
    if (pending || status === order.status) return;

    setPending(status);
    setError("");

    try {
      const updated = await ordersApi.setStatus(order.id, status);
      onChanged?.(updated);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось изменить статус");
    } finally {
      setPending(null);
    }
  };

  return (
    <div className={st.wrap}>
      <div className={st.actions}>
        {ACTIONS.map(({ status, label, variant }) => {
          const isCurrent = order.status === status;
          const isPending = pending === status;

          return (
            <BaseBtn
              key={status}
              text={isPending ? "..." : label}
              variant={variant}
              disabled={Boolean(pending) || isCurrent}
              onClick={() => handleClick(status)}
            />
          );
        })}
      </div>

      {error ? (
        <p className={st.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
