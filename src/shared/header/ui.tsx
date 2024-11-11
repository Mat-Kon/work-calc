import { HamburgerButton, LoginBtn, LogoBtn } from '../buttons';
import { useState } from 'react';
import { MainWrapper } from '../main-wrapper';
import dynamic from 'next/dynamic';
import st from './index.module.scss';

export const Header: React.FC = () => {
  const NavList = dynamic(() => import('../nav-list').then((mod) => mod.NavList), {
    ssr: false,
  });
  const [isOpenMenu, setOpenMenu] = useState(false);
  return (
    <header>
      <MainWrapper className={st.header__wrapper}>
        <LogoBtn />

        <div className={st.mobile__menu}>
          <NavList />

          <LoginBtn />
        </div>

        <HamburgerButton isOpen={isOpenMenu} setOpen={setOpenMenu} />
      </MainWrapper>
    </header>
  );
};
