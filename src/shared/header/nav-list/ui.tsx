'use client';
import Link from 'next/link';
import st from './index.module.scss';
import { usePathname } from 'next/navigation';
import { linksMap } from '../../constants/header';

export const NavList: React.FC = () => {
  const pathName = usePathname();
  const activeClassName = (link: string) => {
    return pathName && pathName.includes(link) ? st.active : '';
  };

  return (
    <nav className={st.nav}>
      <ul className={st.nav__list}>
        {linksMap.map((linkData, index) => (
          <li key={index}>
            <Link
              href={linkData.link}
              className={`${st.nav__item} ${activeClassName(linkData.link)}`}
              data-testid="navLink"
            >
              {linkData.verbName}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
