import type { Order, OrderItem } from '@prisma/client';

export const orderToDto = (order: Order & { items: OrderItem[] }) => ({
  id: order.id,
  orderNumber: order.orderNumber ?? '',
  name: order.name,
  address: order.address,
  phoneNumber: order.phoneNumber,
  meetingDateTime: order.meetingDateTime.toISOString(),
  startWorkDate: order.startWorkDate.toISOString(),
  orderServices: order.items.map((i) => {
    const costPerUnit = Number(i.costPerUnit);
    const count = Number(i.count);
    return {
      id: i.id,
      name: i.name,
      typeValue: i.typeValue,
      costPerUnit,
      count,
      cost: Math.round(costPerUnit * count * 100) / 100,
    };
  }),
});

interface OrderBodyItem {
  kind?: string;
  name: string;
  typeValue?: string;
  costPerUnit: number | string;
  count: number | string;
}

interface OrderBody {
  orderNumber?: string | null;
  name: string;
  address: string;
  phoneNumber: string;
  meetingDateTime: string | Date;
  startWorkDate: string | Date;
  orderServices?: OrderBodyItem[];
}

export const parseOrderBody = (body: OrderBody) => ({
  orderNumber: body.orderNumber || null,
  name: String(body.name),
  address: String(body.address),
  phoneNumber: String(body.phoneNumber),
  meetingDateTime: new Date(body.meetingDateTime),
  startWorkDate: new Date(body.startWorkDate),
  items: (body.orderServices ?? []).map((s) => ({
    kind: s.kind === 'MATERIAL' ? ('MATERIAL' as const) : ('SERVICE' as const),
    name: String(s.name),
    typeValue: String(s.typeValue ?? ''),
    costPerUnit: Number(s.costPerUnit),
    count: Number(s.count),
  })),
});
