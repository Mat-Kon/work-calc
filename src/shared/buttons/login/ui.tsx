import Link from 'next/link';
import st from './index.module.scss';
import { LoginIcon } from '@/shared/icons';

export const LoginBtn = () => {
  return (
    <Link className={st.login} href={'/login'}>
      <LoginIcon />
      Login
    </Link>
  );
};
