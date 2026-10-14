"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { linksMap } from "../../constants/header";
import { useMenu } from "../model/menu-context";
import st from "./index.module.scss";

export const NavList: React.FC = () => {
  const pathname = usePathname();
  const { close } = useMenu();

  const isActive = (link: string) => pathname?.includes(link);

  return (
    <nav className={st.nav}>
      <ul className={st.nav__list}>
        {linksMap.map((linkData) => (
          <li key={linkData.link}>
            <Link
              href={linkData.link}
              className={`${st.nav__item} ${isActive(linkData.link) ? st.active : ""}`}
              data-testid="navLink"
              onClick={close}
            >
              {linkData.verbName}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
