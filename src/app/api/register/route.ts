import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/shared/lib/prisma';

export async function POST(req: Request) {
  const { login, password } = await req.json();

  if (
    typeof login !== 'string' ||
    typeof password !== 'string' ||
    login.length < 3 ||
    password.length < 4
  ) {
    return NextResponse.json({ error: 'Логин от 3 символов, пароль от 4' }, { status: 400 });
  }

  const exists = await prisma.user.findUnique({ where: { login } });
  if (exists) {
    return NextResponse.json({ error: 'Такой логин уже занят' }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { login, passwordHash } });

  return NextResponse.json({ ok: true }, { status: 201 });
}
