import { MY_SERVICES_LIST_NAME } from '@/shared/constants/my-service-page';
import { useEffect, useState } from 'react';
import st from './index.module.scss';
import { deleteServiceItem } from './model';
import { TableItem } from '@/features/my-services';
import { IServiceItemData } from '@/shared/types/my-services';

interface Props {
  setServiceData: (serviceData: IServiceItemData) => void;
}

export const TableServices: React.FC<Props> = ({ setServiceData }) => {
  const [servicesList, setServiceList] = useState<IServiceItemData[]>([]);

  const handleClickDelete = (id: string) => {
    deleteServiceItem(id);
    const updatedList = servicesList.filter((item) => item.id !== id);
    setServiceList(() => updatedList);
  };

  const handleClickEdit = (serviceData: IServiceItemData) => {
    setServiceData(serviceData);
  };

  useEffect(() => {
    const localList = localStorage.getItem(MY_SERVICES_LIST_NAME);
    if (localList) {
      const parseList: IServiceItemData[] = JSON.parse(localList);
      setServiceList(parseList);
    }
  }, []);

  return servicesList.length > 0 ? (
    <table className={st.servicesTable}>
      <caption>Список услуг</caption>
      <thead className={st.servicesTable__head}>
        <tr>
          <th scope="col" className={st.servicesTable__headings}>
            Название
          </th>
          <th scope="col" className={st.servicesTable__headings}>
            Ед. измерения
          </th>
          <th scope="col" className={st.servicesTable__headings}>
            Стоимость
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {servicesList.map((item) => (
          <TableItem
            item={item}
            key={item.id}
            onDelete={() => handleClickDelete(item.id)}
            onEdit={() => handleClickEdit(item)}
          />
        ))}
      </tbody>
    </table>
  ) : null;
};
