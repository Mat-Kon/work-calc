import Link from "next/link";

import { LogoIcon } from "@/shared/icons";

import st from "./index.module.scss";

export function LogoBtn() {
  return (
    <Link href="/" className={st.logoBtn} aria-label="MKcalc — на главную">
      <span className={st.iconWrap}>
        <LogoIcon />
      </span>
      <span className={st.text}>BC</span>
    </Link>
  );
}
