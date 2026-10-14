import { type CalcItem } from "@/shared/types/calculate";

export interface OrderTotals {
  subtotal: number;
  discountAmount: number;
  total: number;
  prepayment: number;
  toPay: number;
}

const round2 = (v: number) => Math.round(v * 100) / 100;

export function calcOrderTotals(
  items: CalcItem[],
  discountPercent: number,
  isPrepaid: boolean,
): OrderTotals {
  const subtotal = round2(items.reduce((sum, item) => sum + item.cost, 0));
  const discountAmount = round2((subtotal * discountPercent) / 100);
  const total = round2(subtotal - discountAmount);
  const prepayment = isPrepaid ? round2(total / 2) : 0;
  const toPay = round2(total - prepayment);

  return { subtotal, discountAmount, total, prepayment, toPay };
}
