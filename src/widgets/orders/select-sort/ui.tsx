import { CustomSelect } from '@/shared/select';
import st from './index.module.scss';
import { SORT_OPTIONS } from '@/features/orders/model';

interface Props {
  onChange: (value: string) => void;
}

export const SelectSort: React.FC<Props> = ({ onChange }) => {
  return (
    <CustomSelect
      className={st.sort}
      optionValues={SORT_OPTIONS}
      defaultValue={SORT_OPTIONS[0]}
      hasDisable
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
