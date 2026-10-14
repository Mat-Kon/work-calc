import { NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import { getUserId } from '@/shared/lib/auth';
import { orderToDto, parseOrderBody } from '@/shared/lib/order-dto';

export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const orders = await prisma.order.findMany({
    where: { userId },
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(orders.map(orderToDto));
}

export async function POST(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const { items, ...data } = parseOrderBody(await req.json());
  const order = await prisma.order.create({
    data: { ...data, userId, items: { create: items } },
    include: { items: true },
  });
  return NextResponse.json(orderToDto(order), { status: 201 });
}
