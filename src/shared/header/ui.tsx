import { HamburgerButton, LogoBtn } from '../buttons';
import { useState } from 'react';
import { isMobileView } from '../helpers/functions';
import { NavList } from './nav-list';
import st from './index.module.scss';

export const Header: React.FC = () => {
  const [isOpenMenu, setOpenMenu] = useState(false);
  const isHiddenMobileMenu = isMobileView() && !isOpenMenu;

  return (
    <header className={st.header}>
      <LogoBtn />

      <div className={`${st.mobile__menu} ${!isHiddenMobileMenu ? st.active : ''}`}>
        <NavList />

        {/* <LoginBtn /> */}
      </div>

      <HamburgerButton isOpen={isOpenMenu} setOpen={setOpenMenu} />
    </header>
  );
};
