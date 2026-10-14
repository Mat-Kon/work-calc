import { forwardRef, type InputHTMLAttributes } from "react";

import st from "./index.module.scss";

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput({ type = "text", className, ...props }, ref) {
    return (
      <input
        ref={ref}
        type={type}
        className={[st.input, className].filter(Boolean).join(" ")}
        {...props}
      />
    );
  },
);

TextInput.displayName = "TextInput";
