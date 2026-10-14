export { default } from 'next-auth/middleware';

// Закрываем страницы приложения, главная и /login остаются открытыми
export const config = {
  matcher: ['/calculate/:path*', '/orders/:path*', '/services/:path*', '/materials/:path*'],
};
