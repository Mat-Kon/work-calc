"use client";

import { BaseBtn } from "@/shared/buttons/base";

export function PrintOrderButton() {
  const handlePrint = () => {
    window.print();
  };

  return <BaseBtn text="Печать / PDF" onClick={handlePrint} />;
}
