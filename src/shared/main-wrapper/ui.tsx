import st from './index.module.scss';

interface Props {
  children: React.ReactNode;
  className: string;
}

export const MainWrapper: React.FC<Props> = ({ children, className }) => {
  return <div className={`${st.wrapper} ${className ?? ''}`}>{children}</div>;
};
