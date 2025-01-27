import { CustomSelect } from '@/shared/select';
import st from './index.module.scss';
import { IOrder } from '@/shared/types/calculate';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { sortingOrders } from './model';

interface Props {
  setOrders: Dispatch<SetStateAction<IOrder[] | null>>;
  searchOrders: IOrder[] | null;
}

const sortOptions = ['Сортировать по', 'дате замера', 'дате начала', 'сумме договора'];

export const SelectSort: React.FC<Props> = ({ setOrders, searchOrders }) => {
  const [sortValue, setSortValue] = useState('');

  useEffect(() => {
    console.log(searchOrders);
    const sortedOrders = sortingOrders(sortValue);
    if (sortedOrders) {
      setOrders(sortedOrders);
    }
    if (searchOrders?.length) {
      setOrders(null);
      setSortValue('Сортировать по');
    }
  }, [sortValue]);

  return (
    <CustomSelect
      className={st.sort}
      optionValues={sortOptions}
      defaultValue={sortOptions[0]}
      hasDisable
      onChange={(e) => setSortValue(e.target.value)}
    />
  );
};
