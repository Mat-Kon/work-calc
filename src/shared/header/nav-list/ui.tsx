'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

import Link from 'next/link';
import st from './index.module.scss';
import { usePathname } from 'next/navigation';
import { linksMap } from '../../constants/header';

export const NavList: React.FC = () => {
  const pathName = usePathname();
  const activeClassName = (link: string) => {
    return pathName && pathName.includes(link) ? st.active : '';
  };
  const { data: session } = useSession();

  return (
    <nav className={st.nav}>
      <ul className={st.nav__list}>
        {linksMap.map((linkData, index) => (
          <li key={index} id={linkData.link}>
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
      {session ? (
        <div className={st.auth}>
          <img alt="avatar" src={session.user?.image ?? ''} width={32} height={32} />
          <button onClick={() => signOut()}>Выход</button>
        </div>
      ) : (
        <button onClick={() => signIn()}>Вход</button>
      )}
    </nav>
  );
};
