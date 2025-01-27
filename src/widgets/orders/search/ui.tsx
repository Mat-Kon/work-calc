import { useDeferredValue, useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { IOrder } from '@/shared/types/calculate';
import { searchOrdersByAddress } from './model';
import { TextInput } from '@/shared/inputs';
import st from './index.module.scss';

interface Props {
  setSearchOrders: Dispatch<SetStateAction<IOrder[] | null>>;
  setSortedOrders: Dispatch<SetStateAction<IOrder[] | null>>;
}

export const SearchOrder: React.FC<Props> = ({ setSearchOrders, setSortedOrders }) => {
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    const orders = searchOrdersByAddress(deferredSearch);
    if (orders && orders.length > 0) {
      setSortedOrders(null);
      setSearchOrders(orders);
    }
    if (search === '') {
      setSearchOrders(null);
    }
  }, [deferredSearch, setSearchOrders]);

  return (
    <label className={st.label}>
      Поиск по адресу
      <TextInput
        className={st.searchInput}
        type="text"
        placeholder="улица, дом, квартира"
        onChange={(e) => setSearch(e.target.value)}
      />
    </label>
  );
};
