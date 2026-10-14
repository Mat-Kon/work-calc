import st from './index.module.scss';
import { TableItem } from '@/features/my-services';
import { IMaterialItemData } from '@/shared/types/materials';
import { catalogApi } from '@/shared/api';
import { useCatalog } from '@/shared/api/use-catalog';

interface Props {
  setMaterialsData: (MaterialsData: IMaterialItemData) => void;
  isOpen: boolean;
}

export const TableMaterials: React.FC<Props> = ({ setMaterialsData, isOpen }) => {
  const { items, setItems, isLoading, error } = useCatalog('MATERIAL', isOpen);

  const handleClickDelete = async (id: string) => {
    try {
      await catalogApi.remove(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch {
      alert('Не удалось удалить');
    }
  };

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p role="alert">Ошибка: {error}</p>;

  return items.length > 0 ? (
    <table className={st.servicesTable}>
      <caption>Список материалов</caption>
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
        {items.map((item) => (
          <TableItem
            item={item}
            key={item.id}
            onDelete={() => handleClickDelete(item.id)}
            onEdit={() => setMaterialsData(item)}
          />
        ))}
      </tbody>
    </table>
  ) : null;
};
