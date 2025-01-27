'use client';
import { HamburgerButton, LogoBtn } from '../buttons';
import { useState } from 'react';
import { MainWrapper } from '../main-wrapper';
import st from './index.module.scss';
import { isMobileView } from '../helpers/functions';
import { NavList } from './nav-list';

export const Header: React.FC = () => {
  const [isOpenMenu, setOpenMenu] = useState(false);
  const isHiddenMobileMenu = isMobileView() && !isOpenMenu;

  return (
    <header>
      <MainWrapper className={st.header__wrapper}>
        <LogoBtn />

        <div className={`${st.mobile__menu} ${!isHiddenMobileMenu ? st.active : ''}`}>
          <NavList />

          {/* <LoginBtn /> */}
        </div>

        <HamburgerButton isOpen={isOpenMenu} setOpen={setOpenMenu} />
      </MainWrapper>
    </header>
  );
};
