"use client";

import { type NextPage } from "next";
import { useRef, useState } from "react";

import { PrintOrderButton } from "@/features/print-order";
import { BaseBtn } from "@/shared/buttons/base";
import { PageHeading } from "@/shared/page-heading";
import { type CalcItem } from "@/shared/types/calculate";
import { AddOrderForm } from "@/widgets/calculate";
import { AddServicePopup } from "@/widgets/calculate/add-service-form";
import { ServiceTable } from "@/widgets/calculate/services-table";

import st from "./index.module.scss";

const Calculate: NextPage = () => {
  const [isOpenPopup, setOpenPopup] = useState(false);
  const [serviceData, setServiceData] = useState<CalcItem | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleClickAddBtn = () => {
    setOpenPopup(true);
  };

  const handleClickEdit = (item: CalcItem) => {
    setOpenPopup(true);
    setServiceData(item);
  };

  const handleClickCloseBtn = () => {
    setOpenPopup(false);
    setServiceData(null);
  };

  const handleClickSaveOrder = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event("submit", { bubbles: true }));
    }
  };

  return (
    <>
      <PageHeading text="Расчет стоимости" />
      <div className={st.calc}>
        <AddOrderForm ref={formRef} />

        <nav className={`${st.calc__toolbar} no-print`}>
          <BaseBtn text="Добавить" onClick={handleClickAddBtn} />
        </nav>

        <div className={st.printArea}>
          <ServiceTable setServiceData={handleClickEdit} isOpen={isOpenPopup} />
        </div>

        <div className={`${st.calc__actions} no-print`}>
          <PrintOrderButton />
          <BaseBtn text="Сохранить" onClick={handleClickSaveOrder} />
        </div>

        {isOpenPopup && (
          <AddServicePopup
            isOpen={isOpenPopup}
            onClose={handleClickCloseBtn}
            serviceItem={serviceData}
          />
        )}
      </div>
    </>
  );
};

export default Calculate;
