'use client';
import { useEffect, useMemo, useState } from 'react';
import { PageHeading } from '@/shared/page-heading';
import { IOrder } from '@/shared/types/calculate';
import { OrdersList, SearchOrder, SelectSort } from '@/widgets/orders';
import { searchOrdersByAddress, sortOrders } from '@/features/orders/model';
import { ordersApi } from '@/shared/api';
import st from './index.module.scss';

export default function History() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [sortValue, setSortValue] = useState('');

  useEffect(() => {
    ordersApi
      .list()
      .then(setOrders)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Поиск и сортировка считаются из одного списка, без отдельных состояний на каждый случай
  const visibleOrders = useMemo(
    () => sortOrders(searchOrdersByAddress(orders, search), sortValue),
    [orders, search, sortValue]
  );

  const handleDeleted = (id: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  return (
    <>
      <PageHeading text="Созданные заказы" />
      <nav className={st.navbar}>
        <SelectSort onChange={setSortValue} />
        <SearchOrder value={search} onChange={setSearch} />
      </nav>

      {isLoading && <p>Загрузка...</p>}
      {error && <p role="alert">Ошибка: {error}</p>}
      {!isLoading && !error && orders.length === 0 && <p>Заказов пока нет</p>}
      {!isLoading && orders.length > 0 && visibleOrders.length === 0 && <p>Ничего не найдено</p>}

      <OrdersList orders={visibleOrders} onDeleted={handleDeleted} />
    </>
  );
}
