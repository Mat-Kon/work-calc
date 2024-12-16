import { ServiceItem } from '@/features/calculate';
import { LOCAL_LIST_NAME } from '@/shared/constants/calculate-page';
import { TServiceItem } from '@/shared/types/calculate';
import { useEffect, useState } from 'react';
import st from './index.module.scss';
import { deleteServiceItem } from './model';

export const ServiceTable: React.FC = () => {
  const [servicesList, setServiceList] = useState<TServiceItem[]>([]);
  const [totalCost, setTotalCost] = useState(0);

  const handleClickDelete = (id: string) => {
    deleteServiceItem(id);
    const updatedList = servicesList.filter((item) => item.id !== id);
    const updatedTotalCost = updatedList.reduce((acc, curValue) => acc + curValue.cost, 0);
    setServiceList(() => updatedList);
    setTotalCost(() => updatedTotalCost);
  };

  useEffect(() => {
    const localList = localStorage.getItem(LOCAL_LIST_NAME);
    if (localList) {
      const parseList: TServiceItem[] = JSON.parse(localList);
      const totalCost = parseList.reduce((acc, curValue) => acc + curValue.cost, 0);
      setServiceList(parseList);
      setTotalCost(totalCost);
    }
  }, []);

  return (
    <table className={st.servicesTable}>
      <caption>Необходимые работы</caption>
      <thead className={st.servicesTable__head}>
        <tr>
          <th scope="col" className={st.servicesTable__headings}>
            Вид работы
          </th>
          <th scope="col" className={st.servicesTable__headings}>
            Ед. измерения
          </th>
          <th scope="col" className={st.servicesTable__headings}>
            Колличество
          </th>
          <th scope="col" className={st.servicesTable__headings}>
            Стоимость
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {servicesList.map((item) => (
          <ServiceItem item={item} key={item.id} onDelete={() => handleClickDelete(item.id)} />
        ))}
      </tbody>
      <tfoot className={st.servicesTable__footer}>
        <tr>
          <th scope="row" colSpan={3} className={st.headings}>
            Итого
          </th>
          <td>{totalCost.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</td>
          <th></th>
        </tr>
      </tfoot>
    </table>
  );
};