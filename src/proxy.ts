import { auth } from '@/auth';
import { NextResponse, type NextRequest } from 'next/server';

export async function proxy(req: NextRequest) {
  const session = await auth();

  const isProtected = /^\/(calculate|orders|services|materials)/.test(req.nextUrl.pathname);

  if (isProtected && !session?.user) {
    const loginUrl = new URL('/login', req.nextUrl.origin);
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/calculate/:path*', '/orders/:path*', '/services/:path*', '/materials/:path*'],
};
