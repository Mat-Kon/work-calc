import { IconBtn } from '@/shared/buttons';
import { EditIcon, TrashIcon } from '@/shared/icons';
import st from './index.module.scss';
import { IServiceItemData } from '@/shared/types/my-services';
import { IMaterialItemData } from '@/shared/types/materials';

interface Props {
  item: IServiceItemData | IMaterialItemData;
  onDelete: () => void;
  onEdit: () => void;
}

export const TableItem: React.FC<Props> = ({ item, onDelete, onEdit }) => {
  const { costPerUnit, name, typeValue } = item;

  return (
    <tr>
      <th scope="row" className={st.headings}>
        {name}
      </th>
      <td>{typeValue}</td>
      <td>{costPerUnit.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</td>
      <td className={st.item__btns}>
        <IconBtn className={st.item__editBtn} title="Редактировать" onClick={onEdit}>
          <EditIcon />
        </IconBtn>

        <IconBtn className={st.item__deleteBtn} title="Удалить" onClick={onDelete}>
          <TrashIcon />
        </IconBtn>
      </td>
    </tr>
  );
};
