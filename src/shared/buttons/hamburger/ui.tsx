"use client";
import { useMenu } from "@/shared/header/model/menu-context";
import st from "./index.module.scss";

export const HamburgerButton: React.FC = () => {
  const { isOpen, toggle } = useMenu();

  return (
    <button
      type="button"
      className={`${st.hamburger} ${isOpen ? st.active : ""}`}
      onClick={toggle}
      aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      <span />
      <span />
      <span />
    </button>
  );
};
