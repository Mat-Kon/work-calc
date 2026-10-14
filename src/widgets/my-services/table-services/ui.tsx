import st from "./index.module.scss";
import { TableItem } from "@/features/my-services";
import { IServiceItemData } from "@/shared/types/my-services";
import { catalogApi } from "@/shared/api";
import { useCatalog } from "@/shared/api/use-catalog";

interface Props {
  setServiceData: (serviceData: IServiceItemData) => void;
  isOpen: boolean;
}

export const TableServices: React.FC<Props> = ({ setServiceData, isOpen }) => {
  const { items, setItems, isLoading, error } = useCatalog("SERVICE", isOpen);

  const handleClickDelete = async (id: string) => {
    try {
      await catalogApi.remove(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch {
      alert("Не удалось удалить");
    }
  };

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p role="alert">Ошибка: {error}</p>;

  return items.length > 0 ? (
    <table className={st.servicesTable}>
      <caption>Список услуг</caption>
      <thead className={st.servicesTable__head}>
        <tr>
          <th
            scope="col"
            className={st.servicesTable__headings}
            style={{ width: "50%" }}
          >
            Название
          </th>
          <th
            scope="col"
            className={st.servicesTable__headings}
            style={{ width: "20%" }}
          >
            Ед. измерения
          </th>
          <th
            scope="col"
            className={st.servicesTable__headings}
            style={{ width: "20%" }}
          >
            Стоимость
          </th>
          <th style={{ width: "100px" }}></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <TableItem
            item={item}
            key={item.id}
            onDelete={() => handleClickDelete(item.id)}
            onEdit={() => setServiceData(item)}
          />
        ))}
      </tbody>
    </table>
  ) : null;
};
