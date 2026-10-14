"use client";
import { BaseBtn } from "@/shared/buttons/base";
import st from "./index.module.scss";

export const PrintOrderButton: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return <BaseBtn className={st.printBtn} text="Печать / PDF" onClick={handlePrint} />;
};
