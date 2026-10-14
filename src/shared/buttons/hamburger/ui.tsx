"use client";

import { useMenu } from "@/shared/header/model/menu-context";

import st from "./index.module.scss";

export function HamburgerButton() {
  const { isOpen, toggle } = useMenu();

  return (
    <button
      type="button"
      className={[st.hamburger, isOpen ? st.active : null]
        .filter(Boolean)
        .join(" ")}
      onClick={toggle}
      aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      <span className={st.line} />
      <span className={st.line} />
      <span className={st.line} />
    </button>
  );
}
