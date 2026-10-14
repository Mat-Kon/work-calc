import { IconBtn } from "@/shared/buttons/icon-btn";
import { EditIcon, TrashIcon } from "@/shared/icons";
import { type MaterialItemData } from "@/shared/types/materials";
import { type ServiceItemData } from "@/shared/types/my-services";

import st from "./index.module.scss";

type ItemData = ServiceItemData | MaterialItemData;

interface TableItemProps {
  item: ItemData;
  onDelete: () => void;
  onEdit: () => void;
}

export function TableItem({ item, onDelete, onEdit }: TableItemProps) {
  const { costPerUnit, name, typeValue } = item;

  return (
    <tr>
      <th scope="row" className={st.headings}>
        {name}
      </th>
      <td>{typeValue}</td>
      <td>
        {costPerUnit.toLocaleString("ru-RU", {
          style: "currency",
          currency: "RUB",
        })}
      </td>
      <td className={st.item__btns}>
        <IconBtn
          className={st.item__editBtn}
          title="Редактировать"
          onClick={onEdit}
        >
          <EditIcon />
        </IconBtn>

        <IconBtn
          className={st.item__deleteBtn}
          title="Удалить"
          onClick={onDelete}
        >
          <TrashIcon />
        </IconBtn>
      </td>
    </tr>
  );
}
