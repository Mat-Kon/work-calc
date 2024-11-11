import { LogoIcon } from '@/shared/icons';
import Link from 'next/link';
import st from './index.module.scss';

export const LogoBtn = () => {
  return (
    <Link href={'/'} className={st.logoBtn}>
      <span>
        <LogoIcon />
      </span>
      BC
    </Link>
  );
};
