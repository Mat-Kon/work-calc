import st from './index.module.scss';

interface Props {
  text: string;
}

export const PageHeading: React.FC<Props> = ({ text }) => {
  return <h1 className={st.pageHeading}>{text}</h1>;
};
