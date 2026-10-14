import { type ButtonHTMLAttributes, type ReactNode } from "react";

import st from "./index.module.scss";

interface IconBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function IconBtn({
  type = "button",
  className,
  children,
  ...props
}: IconBtnProps) {
  return (
    <button
      type={type}
      className={[st.iconBtn, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
