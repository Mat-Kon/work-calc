import { NextResponse } from "next/server";

import { getUserId } from "@/auth";
import { orderToDto, parseOrderBody } from "@/shared/lib/order-dto";
import { prisma } from "@/shared/lib/prisma";

type Ctx = { params: Promise<{ id: string }> };

const STATUSES = ["QUEUED", "IN_PROGRESS", "DONE"] as const;

export async function GET(_req: Request, { params }: Ctx) {
  const userId = await getUserId();
  if (!userId)
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;

  const order = await prisma.order.findFirst({
    where: { id, userId },
    include: { items: true },
  });

  return order
    ? NextResponse.json(orderToDto(order))
    : NextResponse.json({ error: "not found" }, { status: 404 });
}

export async function PUT(req: Request, { params }: Ctx) {
  const userId = await getUserId();
  if (!userId)
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;

  const exists = await prisma.order.findFirst({
    where: { id, userId },
    select: { id: true },
  });
  if (!exists)
    return NextResponse.json({ error: "not found" }, { status: 404 });

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

export async function PATCH(req: Request, { params }: Ctx) {
  const userId = await getUserId();
  if (!userId)
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;

  const body = (await req.json().catch(() => ({}))) as { status?: string };
  const status = body.status;

  if (!status || !STATUSES.includes(status as (typeof STATUSES)[number])) {
    return NextResponse.json({ error: "invalid status" }, { status: 400 });
  }

  const order = await prisma.order.findFirst({
    where: { id, userId },
    select: { id: true },
  });
  if (!order) return NextResponse.json({ error: "not found" }, { status: 404 });

  const updated = await prisma.order.update({
    where: { id },
    data: { status: status as (typeof STATUSES)[number] },
    include: { items: true },
  });

  return NextResponse.json(orderToDto(updated));
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const userId = await getUserId();
  if (!userId)
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;

  const res = await prisma.order.deleteMany({ where: { id, userId } });
  return res.count
    ? NextResponse.json({ ok: true })
    : NextResponse.json({ error: "not found" }, { status: 404 });
}
