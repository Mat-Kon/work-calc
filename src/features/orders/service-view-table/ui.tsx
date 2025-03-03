import { ServiceItem } from '@/features/calculate';
import { IServiceItem } from '@/shared/types/calculate';
import st from './index.module.scss';

interface Props {
  servicesList: IServiceItem[];
}

export const ServiceViewTable: React.FC<Props> = ({ servicesList }) => {
  const totalCost = servicesList.reduce((acc, item) => acc + item.cost, 0);
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
        </tr>
      </thead>
      <tbody>
        {servicesList.map((item) => (
          <ServiceItem
            item={item}
            key={item.id}
            onDelete={() => {}}
            onEdit={() => {}}
            isEditPage={false}
          />
        ))}
      </tbody>
      <tfoot className={st.servicesTable__footer}>
        <tr>
          <th scope="row" colSpan={3} className={st.headings}>
            Итого
          </th>
          <td>{totalCost.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</td>
        </tr>
      </tfoot>
    </table>
  );
};
