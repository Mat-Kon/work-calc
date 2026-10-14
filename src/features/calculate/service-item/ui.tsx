import { IconBtn } from "@/shared/buttons/icon-btn";
import { EditIcon, TrashIcon } from "@/shared/icons";
import { type CalcItem } from "@/shared/types/calculate";

import st from "./index.module.scss";

interface ServiceItemProps {
  item: CalcItem;
  onDelete: () => void;
  onEdit: () => void;
  isEditPage: boolean;
}

const formatPrice = (value: number) =>
  value.toLocaleString("ru-RU", { style: "currency", currency: "RUB" });

export function ServiceItem({
  item,
  onDelete,
  onEdit,
  isEditPage,
}: ServiceItemProps) {
  const { name, typeValue, count, cost } = item;

  return (
    <tr>
      <th scope="row" className={st.heading}>
        {name}
      </th>
      <td>{typeValue}</td>
      <td>{count}</td>
      <td>{formatPrice(cost)}</td>
      {isEditPage ? (
        <td className={`${st.actions} ${st.noPrint}`}>
          <IconBtn
            className={st.editBtn}
            title="Редактировать"
            onClick={onEdit}
          >
            <EditIcon />
          </IconBtn>
          <IconBtn className={st.deleteBtn} title="Удалить" onClick={onDelete}>
            <TrashIcon />
          </IconBtn>
        </td>
      ) : null}
    </tr>
  );
}
