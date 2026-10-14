import { type ReactNode } from "react";

import { Footer } from "@/widgets/footer";

import { Header } from "../header";
import st from "./index.module.scss";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className={st.root}>
      <Header />
      <main className={st.main}>{children}</main>
      <Footer />
    </div>
  );
}
