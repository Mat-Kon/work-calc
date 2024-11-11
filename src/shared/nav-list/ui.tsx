'use client';
import Link from 'next/link';
import st from './index.module.scss';
import { usePathname } from 'next/navigation';

type linkData = {
  link: string;
  verbName: string;
};

const linksMap: linkData[] = [
  {
    link: '/calculate',
    verbName: 'Рассчитать',
  },
  {
    link: '/history',
    verbName: 'История',
  },
  {
    link: '/settings',
    verbName: 'Настройки',
  },
  {
    link: '/bd',
    verbName: 'База данных',
  },
];

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
