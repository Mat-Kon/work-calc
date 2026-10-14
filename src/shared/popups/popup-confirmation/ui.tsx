"use client";

import { BaseBtn } from "@/shared/buttons/base";

import { PopupWrapper } from "../popup-wrapper";
import st from "./index.module.scss";

interface PopupConfirmationProps {
  isOpen: boolean;
  text: string;
  confirm: () => void;
  reject: () => void;
}

export function PopupConfirmation({
  isOpen,
  text,
  confirm,
  reject,
}: PopupConfirmationProps) {
  return (
    <PopupWrapper isOpen={isOpen} onClose={reject}>
      <div className={st.content}>
        <p className={st.text}>{text}</p>
        <div className={st.btns}>
          <BaseBtn text="Нет" variant="ghost" onClick={reject} />
          <BaseBtn text="Да" onClick={confirm} />
        </div>
      </div>
    </PopupWrapper>
  );
}
