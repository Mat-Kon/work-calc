import { NextResponse } from 'next/server';
import { ItemKind } from '@prisma/client';
import { prisma } from '@/shared/lib/prisma';
import { getUserId } from '@/auth';

const toDto = (i: { id: string; name: string; typeValue: string; costPerUnit: unknown }) => ({
  id: i.id,
  name: i.name,
  typeValue: i.typeValue,
  costPerUnit: Number(i.costPerUnit),
});

// GET /api/catalog?kind=SERVICE | MATERIAL
export async function GET(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const kind = new URL(req.url).searchParams.get('kind') as ItemKind | null;
  const items = await prisma.catalogItem.findMany({
    where: { userId, ...(kind ? { kind } : {}) },
    orderBy: { createdAt: 'asc' },
  });
  return NextResponse.json(items.map(toDto));
}

export async function POST(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const { kind, name, typeValue, costPerUnit } = await req.json();
  if (
    !['SERVICE', 'MATERIAL'].includes(kind) ||
    !name ||
    !typeValue ||
    !(Number(costPerUnit) >= 0)
  ) {
    return NextResponse.json({ error: 'bad request' }, { status: 400 });
  }

  const item = await prisma.catalogItem.create({
    data: { userId, kind, name, typeValue, costPerUnit: Number(costPerUnit) },
  });
  return NextResponse.json(toDto(item), { status: 201 });
}
