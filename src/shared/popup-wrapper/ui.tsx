import st from './index.module.scss';

interface Props {
  children: React.ReactNode;
  id: string | number;
}

export const PopupWrapper: React.FC<Props> = ({ children, id }) => {
  return (
    <div className={st.popupWrapper} id={`${id}`} popover="manual">
      {children}
    </div>
  );
};
