"use client";

import { useEffect, type ReactNode } from "react";

import st from "./index.module.scss";

interface PopupWrapperProps {
  isOpen: boolean;
  children: ReactNode;
  onClose?: () => void;
  labelledBy?: string;
}

export function PopupWrapper({
  isOpen,
  children,
  onClose,
  labelledBy,
}: PopupWrapperProps) {
  useEffect(() => {
    if (!isOpen) return;

    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={st.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className={st.popup}>{children}</div>
    </div>
  );
}
