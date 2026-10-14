"use client";

import { type NextPage } from "next";
import { useState } from "react";

import { BaseBtn } from "@/shared/buttons/base";
import { PageHeading } from "@/shared/page-heading";
import { type MaterialItemData } from "@/shared/types/materials";
import { AddMaterialForm } from "@/widgets/materials";
import { TableMaterials } from "@/widgets/materials/table-materials";

import st from "./index.module.scss";

const Materials: NextPage = () => {
  const [isOpenPopup, setOpenPopup] = useState(false);
  const [materialData, setMaterialData] = useState<MaterialItemData | null>(
    null,
  );

  const handleClickAddBtn = () => setOpenPopup(true);

  const handleClickEdit = (material: MaterialItemData) => {
    setOpenPopup(true);
    setMaterialData(material);
  };

  const handleClickCloseBtn = () => {
    setOpenPopup(false);
    setMaterialData(null);
  };

  return (
    <>
      <PageHeading text="Мои материалы" />
      <div className={st.myService}>
        <nav className={st.myService__toolbar}>
          <BaseBtn text="Добавить материал" onClick={handleClickAddBtn} />
        </nav>

        <TableMaterials
          setMaterialsData={handleClickEdit}
          isOpen={isOpenPopup}
        />

        {isOpenPopup ? (
          <AddMaterialForm
            isOpen={isOpenPopup}
            onClose={handleClickCloseBtn}
            materialItem={materialData}
          />
        ) : null}
      </div>
    </>
  );
};

export default Materials;
