"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { linksMap } from "@/shared/constants/header";

import { useMenu } from "../model/menu-context";
import st from "./index.module.scss";

export function NavList() {
  const pathname = usePathname();
  const { close } = useMenu();

  const isActive = (link: string) => {
    if (link === "/") return pathname === "/";
    return pathname === link || pathname?.startsWith(`${link}/`) === true;
  };

  return (
    <nav className={st.nav}>
      <ul className={st.nav__list}>
        {linksMap.map(({ link, label }) => {
          const active = isActive(link);

          return (
            <li key={link}>
              <Link
                href={link}
                className={`${st.nav__item} ${active ? st.active : ""}`}
                data-testid="navLink"
                aria-current={active ? "page" : undefined}
                onClick={close}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
