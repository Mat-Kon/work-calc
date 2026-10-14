import { type OrderStatus, type OrderSummary } from "@/shared/types/calculate";
import { prisma } from "@/shared/lib/prisma";

export interface GetOrdersOptions {
  userId: string;
  status?: OrderStatus;
}

const toNumber = (value: unknown): number => {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value);
  if (value && typeof value === "object" && "toNumber" in value) {
    return (value as { toNumber: () => number }).toNumber();
  }
  return Number(value);
};

export async function getOrders({
  userId,
  status,
}: GetOrdersOptions): Promise<OrderSummary[]> {
  const orders = await prisma.order.findMany({
    where: {
      userId,
      ...(status ? { status } : {}),
    },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return orders.map((order) => {
    const totalCost = order.items.reduce((sum, item) => {
      const unit = toNumber(item.costPerUnit);
      const count = toNumber(item.count);
      return sum + unit * count;
    }, 0);

    return {
      id: order.id,
      orderNumber: order.orderNumber,
      name: order.name,
      address: order.address,
      phoneNumber: order.phoneNumber,
      status: order.status as OrderStatus,
      meetingDateTime: order.meetingDateTime.toISOString(),
      startWorkDate: order.startWorkDate.toISOString(),
      createdAt: order.createdAt.toISOString(),
      totalCost,
    };
  });
}
