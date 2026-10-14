import { TextInput } from '@/shared/inputs';
import st from './index.module.scss';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SearchOrder: React.FC<Props> = ({ value, onChange }) => {
  return (
    <label className={st.label}>
      Поиск по адресу
      <TextInput
        className={st.searchInput}
        type="text"
        placeholder="улица, дом, квартира"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
};
