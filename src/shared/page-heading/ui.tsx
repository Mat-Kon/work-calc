"use client";

import { useRouter } from "next/navigation";

import { BaseBtn } from "@/shared/buttons/base";

import st from "./index.module.scss";

interface PageHeadingProps {
  text: string;
  hasButton?: boolean;
}

export function PageHeading({ text, hasButton }: PageHeadingProps) {
  const router = useRouter();

  return (
    <div className={st.wrap}>
      <div className={st.back}>
        {hasButton ? (
          <BaseBtn text="Назад" variant="ghost" onClick={() => router.back()} />
        ) : null}
      </div>

      <h1 className={st.title}>{text}</h1>

      <div className={st.spacer} aria-hidden />
    </div>
  );
}
