import { type CalcItem } from "@/shared/types/calculate";

import st from "./index.module.scss";

interface ServiceViewTableProps {
  items: CalcItem[];
}

const formatPrice = (value: number) =>
  value.toLocaleString("ru-RU", { style: "currency", currency: "RUB" });

export function ServiceViewTable({ items }: ServiceViewTableProps) {
  if (items.length === 0) return null;

  const totalCost = items.reduce((acc, item) => acc + item.cost, 0);

  return (
    <table className={st.servicesTable}>
      <caption>Необходимые работы</caption>
      <thead>
        <tr>
          <th scope="col">Вид работы</th>
          <th scope="col">Ед. измерения</th>
          <th scope="col">Количество</th>
          <th scope="col">Стоимость</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <th scope="row">{item.name}</th>
            <td>{item.typeValue}</td>
            <td>{item.count}</td>
            <td>{formatPrice(item.cost)}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th scope="row" colSpan={3}>
            Итого
          </th>
          <td>{formatPrice(totalCost)}</td>
        </tr>
      </tfoot>
    </table>
  );
}
