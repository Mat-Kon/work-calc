import { AppLayout } from '@/shared/app-layout';
import { Providers } from '@/shared/providers';
import { type NextPage, type Metadata, type Viewport } from 'next';
import localFont from 'next/font/local';
import '../styles/main.scss';

const globalFont = localFont({
  src: './fonts/GeistMonoVF.woff',
});

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'MKcalc',
  description:
    'Приложение для мастеров по ремонту балконов. Используется для расчета стоимости ремонта и остекления балкона.',
};

// Масштабирование страницы больше не отключаем (доступность)
export const viewport: Viewport = {
  themeColor: '#f9c385',
  width: 'device-width',
  initialScale: 1,
};

const RootLayout: NextPage<Props> = ({ children }) => {
  return (
    <html lang="ru" className={globalFont.className}>
      <body>
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
