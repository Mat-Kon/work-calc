import { type ButtonHTMLAttributes } from "react";

import st from "./index.module.scss";

type Variant = "primary" | "ghost";

interface BaseBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: Variant;
}

const VARIANT_CLASS: Record<Variant, string> = {
  primary: st.primary,
  ghost: st.ghost,
};

export function BaseBtn({
  type = "button",
  text,
  variant = "primary",
  className,
  ...props
}: BaseBtnProps) {
  return (
    <button
      type={type}
      className={[st.baseBtn, VARIANT_CLASS[variant], className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {text}
    </button>
  );
}
