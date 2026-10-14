"use client";

import { type NextPage } from "next";
import { useState } from "react";

import { BaseBtn } from "@/shared/buttons/base";
import { PageHeading } from "@/shared/page-heading";
import { type ServiceItemData } from "@/shared/types/my-services";
import { AddMyServiceForm, TableServices } from "@/widgets/my-services";

import st from "./index.module.scss";

const Services: NextPage = () => {
  const [isOpenPopup, setOpenPopup] = useState(false);
  const [serviceData, setServiceData] = useState<ServiceItemData | null>(null);

  const handleClickAddBtn = () => setOpenPopup(true);

  const handleClickEdit = (service: ServiceItemData) => {
    setOpenPopup(true);
    setServiceData(service);
  };

  const handleClickCloseBtn = () => {
    setOpenPopup(false);
    setServiceData(null);
  };

  return (
    <>
      <PageHeading text="Мои услуги" />
      <div className={st.myService}>
        <nav className={st.myService__toolbar}>
          <BaseBtn text="Добавить услугу" onClick={handleClickAddBtn} />
        </nav>

        <TableServices setServiceData={handleClickEdit} isOpen={isOpenPopup} />

        {isOpenPopup ? (
          <AddMyServiceForm
            isOpen={isOpenPopup}
            onClose={handleClickCloseBtn}
            serviceItem={serviceData}
          />
        ) : null}
      </div>
    </>
  );
};

export default Services;
