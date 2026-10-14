'use client';
import Link from 'next/link';
import st from './index.module.scss';
import { LoginIcon } from '@/shared/icons';
import { signOut, useSession } from 'next-auth/react';

export const LoginBtn = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') return null;

  if (session?.user) {
    return (
      <button type="button" className={st.login} onClick={() => signOut({ callbackUrl: '/login' })}>
        <LoginIcon />
        {session.user.name} · Выйти
      </button>
    );
  }

  return (
    <Link className={st.login} href="/login">
      <LoginIcon />
      Войти
    </Link>
  );
};
