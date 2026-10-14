import st from "./index.module.scss";

const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? "0.1.0";

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={st.footer}>
      <span className={st.copyright}>© {year} MKcalc</span>
      <span className={st.version}>v{APP_VERSION}</span>
    </footer>
  );
};
