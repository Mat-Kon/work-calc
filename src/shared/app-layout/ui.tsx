"use client";
import dynamic from "next/dynamic";
import st from "./index.module.scss";

const Header = dynamic(() => import("../header").then((mod) => mod.Header), {
  ssr: false,
});

interface Props {
  children: React.ReactNode;
}

export const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={st.main}>{children}</main>
      <div>footer</div>
    </>
  );
};
