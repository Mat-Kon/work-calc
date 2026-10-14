"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { HamburgerButton, LoginBtn, LogoBtn } from "../buttons";
import st from "./index.module.scss";
import { MenuProvider, useMenu } from "./model/menu-context";
import { NavList } from "./nav-list";

function HeaderContent() {
  const { isOpen, close } = useMenu();
  const pathname = usePathname();

  // Закрываем меню при смене маршрута
  useEffect(() => {
    close();
  }, [pathname, close]);

  // Escape + блокировка скролла, пока меню открыто
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onEscape);
    };
  }, [isOpen, close]);

  return (
    <header className={st.header}>
      <LogoBtn />

      <div id="mobile-menu" className={`${st.menu} ${isOpen ? st.active : ""}`}>
        <NavList />
        <LoginBtn />
      </div>

      <HamburgerButton />
    </header>
  );
}

export function Header() {
  return (
    <MenuProvider>
      <HeaderContent />
    </MenuProvider>
  );
}
