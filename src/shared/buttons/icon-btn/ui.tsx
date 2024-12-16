import { ReactNode } from 'react';
import st from './index.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const IconBtn: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <button className={`${st.iconBtn} ${className}`} {...props}>
      {children}
    </button>
  );
};
