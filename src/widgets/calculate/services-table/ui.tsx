import { ServiceItem } from '@/features/calculate';
import { IServiceItem } from '@/shared/types/calculate';
import { useEffect, useState } from 'react';
import st from './index.module.scss';
import { deleteServiceItem } from './model';
import { getServicesList } from '@/shared/helpers/functions';

interface Props {
  setServiceData: (serviceData: IServiceItem) => void;
  isOpen: boolean;
}

export const ServiceTable: React.FC<Props> = ({ setServiceData, isOpen }) => {
  const [services, setServiceList] = useState<IServiceItem[]>([]);
  const [totalCost, setTotalCost] = useState(0);

  const handleClickDelete = (id: string) => {
    deleteServiceItem(id);
    const updatedList = services.filter((item) => item.id !== id);
    const updatedTotalCost = updatedList.reduce((acc, curValue) => acc + curValue.cost, 0);
    setServiceList(() => updatedList);
    setTotalCost(() => updatedTotalCost);
  };

  const handleClickEdit = (serviceData: IServiceItem) => {
    setServiceData(serviceData);
  };

  useEffect(() => {
    const servicesFromStorage = getServicesList();
    if (servicesFromStorage?.length) {
      setServiceList(servicesFromStorage);
      setTotalCost(servicesFromStorage.reduce((acc, curValue) => acc + curValue.cost, 0));
    }
  }, [isOpen]);

  return services.length > 0 ? (
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
        {services.map((item) => (
          <ServiceItem
            item={item}
            key={item.id}
            onDelete={() => handleClickDelete(item.id)}
            onEdit={() => handleClickEdit(item)}
            isEditPage
          />
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
  ) : null;
};
