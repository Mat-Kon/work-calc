import st from './index.module.scss';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
}

export const PopupWrapper: React.FC<Props> = ({ children, isOpen }) => {
  return <div className={`${st.popupWrapper} ${isOpen ? st.open : ''} `}>{children}</div>;
};
