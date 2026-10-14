"use client";

import { type NextPage } from "next";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { PrintOrderButton } from "@/features/print-order";
import { ordersApi } from "@/shared/api";
import { BaseBtn } from "@/shared/buttons/base";
import { LOCAL_LIST_NAME } from "@/shared/constants/calculate-page";
import { removeCalcList } from "@/shared/helpers/functions";
import { PageHeading } from "@/shared/page-heading";
import { type CalcItem, type Order } from "@/shared/types/calculate";
import {
  AddOrderForm,
  AddServicePopup,
  ServiceTable,
} from "@/widgets/calculate";

import st from "./index.module.scss";

const OrderEditPage: NextPage = () => {
  const params = useParams();
  const orderId = typeof params?.id === "string" ? params.id : null;

  const [isOpenPopup, setOpenPopup] = useState(false);
  const [serviceData, setServiceData] = useState<CalcItem | null>(null);
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleClickAdd = () => setOpenPopup(true);

  const handleClickEdit = (item: CalcItem) => {
    setOpenPopup(true);
    setServiceData(item);
  };

  const handleClickClose = () => {
    setOpenPopup(false);
    setServiceData(null);
  };

  const handleClickSave = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event("submit", { bubbles: true }));
    }
  };

  useEffect(() => {
    if (!orderId) return;

    let cancelled = false;

    ordersApi
      .get(orderId)
      .then((order) => {
        if (cancelled) return;
        localStorage.setItem(LOCAL_LIST_NAME, JSON.stringify(order.items));
        setOrderData(order);
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      });

    return () => {
      cancelled = true;
    };
  }, [orderId]);

  useEffect(() => {
    return () => removeCalcList();
  }, []);

  if (error) {
    return (
      <p className={st.state} role="alert">
        Заказ не найден
      </p>
    );
  }

  if (!orderData) {
    return <p className={st.state}>Загрузка...</p>;
  }

  const heading = orderData.orderNumber
    ? `Редактирование заказа ${orderData.orderNumber}`
    : "Редактирование заказа";

  return (
    <>
      <PageHeading text={heading} hasButton />

      <div className={st.calc}>
        <div className="print-area">
          <AddOrderForm ref={formRef} order={orderData} />

          <nav className={`${st.toolbar} no-print`}>
            <BaseBtn text="Добавить услугу" onClick={handleClickAdd} />
          </nav>

          <ServiceTable setServiceData={handleClickEdit} isOpen={isOpenPopup} />
        </div>

        <div className={`${st.actions} no-print`}>
          <PrintOrderButton />
          <BaseBtn text="Сохранить" onClick={handleClickSave} />
        </div>

        {isOpenPopup ? (
          <AddServicePopup
            isOpen={isOpenPopup}
            onClose={handleClickClose}
            serviceItem={serviceData}
          />
        ) : null}
      </div>
    </>
  );
};

export default OrderEditPage;
