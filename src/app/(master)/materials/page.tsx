'use client';
import st from './index.module.scss';
import { type NextPage } from 'next';
import { useState } from 'react';
import { BaseBtn } from '@/shared/buttons/base';
import { PageHeading } from '@/shared/page-heading';
import { IMaterialItemData } from '@/shared/types/materials';
import { AddMaterialForm } from '@/widgets/materials';
import { TableMaterials } from '@/widgets/materials/table-materials';

const Materials: NextPage = () => {
  const [isOpenPopup, setOpenPopup] = useState(false);
  const [materialData, setMaterialData] = useState<IMaterialItemData | null>(null);

  const handleClickAddBtn = () => {
    setOpenPopup(true);
  };

  const handleClickEdit = (materialData: IMaterialItemData) => {
    setOpenPopup(true);
    setMaterialData(materialData);
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
          <BaseBtn
            text="Добавить материал"
            className={st.myService__add}
            onClick={handleClickAddBtn}
          />
        </nav>

        <TableMaterials setMaterialsData={handleClickEdit} isOpen={isOpenPopup} />

        {isOpenPopup && (
          <AddMaterialForm
            isOpen={isOpenPopup}
            onClose={handleClickCloseBtn}
            materialItem={materialData}
          />
        )}
      </div>
    </>
  );
};

export default Materials;
