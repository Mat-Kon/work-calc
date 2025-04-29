import { useEffect, useState } from 'react';
import st from './index.module.scss';
import { deleteMAterialItem } from './model';
import { TableItem } from '@/features/my-services';
import { IMaterialItemData } from '@/shared/types/materials';
import { MATERIALS_LIST_NAME } from '@/shared/constants/material-page';

interface Props {
  setMaterialsData: (MaterialsData: IMaterialItemData) => void;
  isOpen: boolean;
}

export const TableMaterials: React.FC<Props> = ({ setMaterialsData, isOpen }) => {
  const [materialsList, setMAterialsList] = useState<IMaterialItemData[]>([]);

  const handleClickDelete = (id: string) => {
    deleteMAterialItem(id);
    const updatedList = materialsList.filter((item) => item.id !== id);
    setMAterialsList(() => updatedList);
  };

  const handleClickEdit = (materialsData: IMaterialItemData) => {
    setMaterialsData(materialsData);
  };

  useEffect(() => {
    const localList = localStorage.getItem(MATERIALS_LIST_NAME);
    if (localList) {
      const parseList: IMaterialItemData[] = JSON.parse(localList);
      setMAterialsList(parseList);
    }
  }, [isOpen]);
  console.log(materialsList);

  return materialsList.length > 0 ? (
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
        {materialsList.map((item) => (
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
