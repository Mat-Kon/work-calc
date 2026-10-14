"use client";

import { useEffect, useState } from "react";

import { ServiceItem } from "@/features/calculate";
import { getCalcList } from "@/shared/helpers/functions";
import { type CalcItem } from "@/shared/types/calculate";

import st from "./index.module.scss";
import { deleteServiceItem } from "./model";

interface ServiceTableProps {
  setServiceData: (item: CalcItem) => void;
  isOpen: boolean;
}

const formatPrice = (value: number) =>
  value.toLocaleString("ru-RU", { style: "currency", currency: "RUB" });

export function ServiceTable({ setServiceData, isOpen }: ServiceTableProps) {
  const [items, setItems] = useState<CalcItem[]>([]);

  const totalCost = items.reduce((sum, item) => sum + item.cost, 0);

  const handleDelete = (id: string) => {
    deleteServiceItem(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const stored = getCalcList();
    if (stored?.length) {
      setItems(stored);
    }
  }, [isOpen]);

  if (items.length === 0) return null;

  return (
    <table className={st.table}>
      <caption className={st.caption}>Необходимые работы</caption>
      <thead>
        <tr>
          <th scope="col" className={st.heading}>
            Вид работы
          </th>
          <th scope="col" className={st.heading}>
            Ед. измерения
          </th>
          <th scope="col" className={st.heading}>
            Количество
          </th>
          <th scope="col" className={st.heading}>
            Стоимость
          </th>
          <th className={st.noPrint} aria-label="Действия" />
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <ServiceItem
            key={item.id}
            item={item}
            isEditPage
            onDelete={() => handleDelete(item.id)}
            onEdit={() => setServiceData(item)}
          />
        ))}
      </tbody>
      <tfoot className={st.footer}>
        <tr>
          <th scope="row" colSpan={3} className={st.heading}>
            Итого
          </th>
          <td>{formatPrice(totalCost)}</td>
          <th className={st.noPrint} aria-hidden />
        </tr>
      </tfoot>
    </table>
  );
}
