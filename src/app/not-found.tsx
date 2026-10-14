import Link from "next/link";

import st from "./not-found.module.scss";

export default function NotFoundPage() {
  return (
    <div className={st.wrap}>
      <h1 className={st.code}>404</h1>
      <p className={st.text}>Страница не найдена</p>
      <Link href="/" className={st.link}>
        На главную
      </Link>
    </div>
  );
}
