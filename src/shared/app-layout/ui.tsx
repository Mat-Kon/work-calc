'use client';

import { SessionProvider } from 'next-auth/react';
import { type Session } from 'next-auth';
import dynamic from 'next/dynamic';
import st from './index.module.scss';

interface Props {
  children: React.ReactNode;
  session?: Session;
}

export const AppLayout: React.FC<Props> = ({ children, session }) => {
  const Header = dynamic(() => import('../header').then((mod) => mod.Header), {
    ssr: false,
  });

  return (
    <>
      <SessionProvider session={session}>
        <Header />
        <main className={st.main}>{children}</main>
        <div>footer</div>
      </SessionProvider>
    </>
  );
};
