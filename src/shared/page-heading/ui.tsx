import { useRouter } from 'next/navigation';
import { BaseBtn } from '../buttons';
import st from './index.module.scss';

interface Props {
  text: string;
  hasButton?: boolean;
}

export const PageHeading: React.FC<Props> = ({ text, hasButton }) => {
  const route = useRouter();

  return (
    <div className={st.pageHeading}>
      <h1 className={`${hasButton ? st.hasButton : ''}`}>{text}</h1>
      {hasButton && <BaseBtn text="Назад" onClick={() => route.back()} />}
    </div>
  );
};
