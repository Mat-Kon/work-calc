import Link from 'next/link';
import st from './index.module.scss';
import { HamburgerButton } from '../buttons';
import { useState } from 'react';

export const Header: React.FC = () => {
  const [isOpenMenu, setOpenMenu] = useState(false);
  return (
    <header>
      <div className={st.wrapper}>
        <Link href={'/'}>logo</Link>

        <nav>
          <ul>
            <li>
              <Link href={'/calculate'} data-testid="navLink">
                Рассчитать
              </Link>
            </li>
            <li>
              <Link href={'/history'} data-testid="navLink">
                История
              </Link>
            </li>
            <li>
              <Link href={'/settings'} data-testid="navLink">
                Настройки
              </Link>
            </li>
            <li>
              <Link href={'/bd'} data-testid="navLink">
                База данных
              </Link>
            </li>
          </ul>
        </nav>

        <HamburgerButton isOpen={isOpenMenu} setOpen={setOpenMenu} />

        <Link href={'/login'}>login</Link>
      </div>
    </header>
  );
};
