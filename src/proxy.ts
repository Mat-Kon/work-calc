// src/proxy.ts
export { auth as proxy } from '@/auth';

export const config = {
  matcher: ['/calculate/:path*', '/orders/:path*', '/services/:path*', '/materials/:path*'],
};
