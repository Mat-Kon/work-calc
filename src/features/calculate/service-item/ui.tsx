import { IconBtn } from '@/shared/buttons';
import { EditIcon, TrashIcon } from '@/shared/icons';
import { IServiceItem } from '@/shared/types/calculate';
import st from './index.module.scss';

interface Props {
  item: IServiceItem;
  onDelete: () => void;
  onEdit: () => void;
}

export const ServiceItem: React.FC<Props> = ({ item, onDelete, onEdit }) => {
  const { nameService, typeValue, count, cost } = item;

  return (
    <tr>
      <th scope="row" className={st.headings}>
        {nameService}
      </th>
      <td>{typeValue}</td>
      <td>{count}</td>
      <td>{cost.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</td>
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
