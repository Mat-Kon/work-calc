import { PageHeading } from '@/shared/page-heading';
import { IOrder } from '@/shared/types/calculate';
import { OrdersList, SearchOrder, SelectSort } from '@/widgets/orders';
import { useState } from 'react';
import st from './index.module.scss';

export default function History() {
  const [searchOrders, setSearchOrders] = useState<IOrder[] | null>(null);
  const [sortedOrders, setSortedOrders] = useState<IOrder[] | null>(null);

  return (
    <>
      <PageHeading text="Созданные заказы" />
      <nav className={st.navbar}>
        <SelectSort setOrders={setSortedOrders} searchOrders={searchOrders} />
        <SearchOrder setSearchOrders={setSearchOrders} setSortedOrders={setSortedOrders} />
      </nav>
      <OrdersList updatedOrders={sortedOrders ?? searchOrders} />
    </>
  );
}
