import { type Dispatch, type SetStateAction } from 'react';
import st from './index.module.scss';

interface Props {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const HamburgerButton: React.FC<Props> = ({ isOpen, setOpen }) => {
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <button className={`${st.hamburger} ${isOpen ? st.open : ''}`} onClick={handleClick}>
      <span className={st.hamburger_item}></span>
      <span className={st.hamburger_item}></span>
      <span className={st.hamburger_item}></span>
    </button>
  );
}