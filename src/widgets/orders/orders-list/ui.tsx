"use client";

import { useState } from "react";

import { OrderListItem } from "@/features/orders";
import { ordersApi } from "@/shared/api";
import { PopupConfirmation } from "@/shared/popups";
import { type OrderSummary } from "@/shared/types/calculate";

import st from "./index.module.scss";

interface OrdersListProps {
  orders: OrderSummary[];
  onDeleted: (id: string) => void;
}

export function OrdersList({ orders, onDeleted }: OrdersListProps) {
  const [isOpen, setOpen] = useState(false);
  const [deleteOrderData, setOrderData] = useState<OrderSummary | null>(null);

  const handleReject = () => {
    setOrderData(null);
    setOpen(false);
  };

  const handleConfirm = async () => {
    if (!deleteOrderData) {
      setOpen(false);
      return;
    }

    try {
      await ordersApi.remove(deleteOrderData.id);
      onDeleted(deleteOrderData.id);
    } catch {
      alert("Не удалось удалить заказ");
    } finally {
      setOrderData(null);
      setOpen(false);
    }
  };

  const handleDeleteOrder = (order: OrderSummary) => {
    setOrderData(order);
    setOpen(true);
  };

  return (
    <div className={st.listWrapper}>
      <ul className={st.orderList}>
        {orders.map((order, index) => (
          <li key={order.id}>
            <OrderListItem
              order={order}
              orderNumber={index + 1}
              onDelete={() => handleDeleteOrder(order)}
            />
          </li>
        ))}
      </ul>

      {isOpen ? (
        <PopupConfirmation
          text={`Удалить заказ ${deleteOrderData?.address ?? ""}?`}
          isOpen={isOpen}
          confirm={handleConfirm}
          reject={handleReject}
        />
      ) : null}
    </div>
  );
}
