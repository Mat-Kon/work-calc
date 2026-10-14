import { NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import { getUserId } from '@/shared/lib/auth';

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Ctx) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { id } = await params;

  const { name, typeValue, costPerUnit } = await req.json();
  // updateMany с userId гарантирует, что чужую запись не изменить
  const res = await prisma.catalogItem.updateMany({
    where: { id, userId },
    data: { name, typeValue, costPerUnit: Number(costPerUnit) },
  });
  return res.count
    ? NextResponse.json({ ok: true })
    : NextResponse.json({ error: 'not found' }, { status: 404 });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { id } = await params;

  const res = await prisma.catalogItem.deleteMany({ where: { id, userId } });
  return res.count
    ? NextResponse.json({ ok: true })
    : NextResponse.json({ error: 'not found' }, { status: 404 });
}
