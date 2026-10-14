"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { LoginIcon } from "@/shared/icons";

import st from "./index.module.scss";

export function LoginBtn() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <span className={st.placeholder} aria-hidden />;
  }

  if (session?.user) {
    const displayName = session.user.name ?? session.user.email ?? "Профиль";

    return (
      <button
        type="button"
        className={st.login}
        onClick={() => signOut({ callbackUrl: "/login" })}
        aria-label={`Выйти (${displayName})`}
      >
        <LoginIcon />
        <span className={st.text}>{displayName} · Выйти</span>
      </button>
    );
  }

  return (
    <Link href="/login" className={st.login}>
      <LoginIcon />
      <span className={st.text}>Войти</span>
    </Link>
  );
}
