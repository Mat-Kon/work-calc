// 'use client';
import { AddServicePopup } from '@/widgets/calculate/add-service-form';
import st from './index.module.scss';
import { type NextPage } from 'next';
import { useState } from 'react';
import { ServiceTable } from '@/widgets/calculate/services-table';

const Calculate: NextPage = () => {
  const [isOpenPopup, setOpenPopup] = useState(false);

  const handleClickAddBtn = () => {
    setOpenPopup(true);
  };

  return (
    <div className={st.calc}>
      <h1 className={st.heading}>Расчет стоимости</h1>

      <nav className={st.calc__toolbar}>
        <button className={st.calc__add} onClick={handleClickAddBtn}>
          Добавить услугу
        </button>
      </nav>

      {!isOpenPopup && <ServiceTable />}

      <AddServicePopup isOpen={isOpenPopup} onClose={() => setOpenPopup(false)} />
    </div>
  );
};

export default Calculate;
