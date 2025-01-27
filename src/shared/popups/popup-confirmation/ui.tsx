import { PopupWrapper } from '../popup-wrapper';
import { BaseBtn } from '@/shared/buttons';
import st from './index.module.scss';

interface Props {
  isOpen: boolean;
  text: string;
  confirm: () => void;
  reject: () => void;
}

export const PopupConfirmation: React.FC<Props> = ({ text, confirm, reject, isOpen }) => {
  const onConfirm = () => {
    confirm();
  };

  const onReject = () => {
    reject();
  };

  return (
    <PopupWrapper isOpen={isOpen}>
      <div className={st.contentWrapper}>
        <p>{text}</p>
        <div className={st.btns}>
          <BaseBtn text="Нет" onClick={onReject} />
          <BaseBtn text="Да" onClick={onConfirm} />
        </div>
      </div>
    </PopupWrapper>
  );
};
