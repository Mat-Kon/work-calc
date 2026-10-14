"use client";

import { TableItem } from "@/features/my-services";
import { catalogApi } from "@/shared/api";
import { useCatalog } from "@/shared/api/use-catalog";
import { type MaterialItemData } from "@/shared/types/materials";

import st from "./index.module.scss";

interface TableMaterialsProps {
  setMaterialsData: (material: MaterialItemData) => void;
  isOpen: boolean;
}

export function TableMaterials({
  setMaterialsData,
  isOpen,
}: TableMaterialsProps) {
  const { items, setItems, isLoading, error } = useCatalog("MATERIAL", isOpen);

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
  if (items.length === 0) return null;

  return (
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
          <th aria-label="Действия" />
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <TableItem
            key={item.id}
            item={item}
            onDelete={() => handleClickDelete(item.id)}
            onEdit={() => setMaterialsData(item)}
          />
        ))}
      </tbody>
    </table>
  );
}
