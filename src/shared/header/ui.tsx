"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { HamburgerButton, LoginBtn, LogoBtn } from "../buttons";
import { NavList } from "./nav-list";
import { MenuProvider, useMenu } from "./model/menu-context";
import st from "./index.module.scss";

const HeaderContent: React.FC = () => {
  const { isOpen, close } = useMenu();
  const pathname = usePathname();

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (!isOpen) return;

    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
    };
  }, [isOpen, close]);

  return (
    <header className={st.header}>
      <LogoBtn />

      <div
        id="mobile-menu"
        className={`${st.mobile__menu} ${isOpen ? st.active : ""}`}
        aria-hidden={!isOpen}
      >
        <NavList />
        <LoginBtn />
      </div>

      <HamburgerButton />
    </header>
  );
};

export const Header: React.FC = () => (
  <MenuProvider>
    <HeaderContent />
  </MenuProvider>
);
