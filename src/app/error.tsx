"use client";

import { useEffect } from "react";

import st from "./error.module.scss";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={st.wrap} role="alert" aria-live="assertive">
      <h2 className={st.title}>Что-то пошло не так</h2>
      <p className={st.text}>
        Попробуйте перезагрузить страницу. Если ошибка повторяется — свяжитесь с
        поддержкой.
      </p>
      {error.digest ? (
        <p className={st.digest}>Код ошибки: {error.digest}</p>
      ) : null}
      <button type="button" className={st.btn} onClick={reset}>
        Попробовать снова
      </button>
    </div>
  );
}
