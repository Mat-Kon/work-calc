import { AppLayout } from '@/shared/app-layout';
import { Providers } from '@/shared/providers';
import { type Metadata, type Viewport } from 'next';
import localFont from 'next/font/local';
import '../styles/main.scss';

const globalFont = localFont({
  src: './fonts/GeistMonoVF.woff',
});

export const metadata: Metadata = {
  title: 'MKcalc',
  description:
    'Приложение для мастеров по ремонту балконов. Используется для расчета стоимости ремонта и остекления балкона.',
};

export const viewport: Viewport = {
  themeColor: '#f9c385',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={globalFont.className}>
      <body>
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
}
