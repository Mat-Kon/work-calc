import { NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import { getUserId } from '@/shared/lib/auth';
import { orderToDto, parseOrderBody } from '@/shared/lib/order-dto';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { id } = await params;

  const order = await prisma.order.findFirst({ where: { id, userId }, include: { items: true } });
  return order
    ? NextResponse.json(orderToDto(order))
    : NextResponse.json({ error: 'not found' }, { status: 404 });
}

// Полная замена заказа и его позиций в одной транзакции
export async function PUT(req: Request, { params }: Ctx) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { id } = await params;

  const exists = await prisma.order.findFirst({ where: { id, userId }, select: { id: true } });
  if (!exists) return NextResponse.json({ error: 'not found' }, { status: 404 });

  const { items, ...data } = parseOrderBody(await req.json());
  const [, order] = await prisma.$transaction([
    prisma.orderItem.deleteMany({ where: { orderId: id } }),
    prisma.order.update({
      where: { id },
      data: { ...data, items: { create: items } },
      include: { items: true },
    }),
  ]);
  return NextResponse.json(orderToDto(order));
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { id } = await params;

  const res = await prisma.order.deleteMany({ where: { id, userId } });
  return res.count
    ? NextResponse.json({ ok: true })
    : NextResponse.json({ error: 'not found' }, { status: 404 });
}
