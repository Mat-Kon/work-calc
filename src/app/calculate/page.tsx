"use client";
import { AddServicePopup } from "@/widgets/calculate/add-service-form";
import st from "./index.module.scss";
import { type NextPage } from "next";
import { useRef, useState } from "react";
import { ServiceTable } from "@/widgets/calculate/services-table";
import { ICalcItem } from "@/shared/types/calculate";
import { BaseBtn } from "@/shared/buttons/base";
import { AddOrderForm } from "@/widgets/calculate";
import { PageHeading } from "@/shared/page-heading";
import { PrintOrderButton } from "@/features/print-order";

const Calculate: NextPage = () => {
  const [isOpenPopup, setOpenPopup] = useState(false);
  const [serviceData, setServiceData] = useState<ICalcItem | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleClickAddBtn = () => {
    setOpenPopup(true);
  };

  const handleClickEdit = (serviceData: ICalcItem) => {
    setOpenPopup(true);
    setServiceData(serviceData);
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
          <button className={st.calc__add} onClick={handleClickAddBtn}>
            Добавить
          </button>
        </nav>

        <div className={st.printArea}>
          <ServiceTable setServiceData={handleClickEdit} isOpen={isOpenPopup} />
        </div>

        <div className={`${st.calc__actions} no-print`}>
          <PrintOrderButton />
          <BaseBtn
            text="Сохранить"
            className={st.calc__add}
            onClick={handleClickSaveOrder}
          />
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
