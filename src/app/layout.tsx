import { AppLayout } from '@/shared/app-layout';
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
    'Приложение для мастеров по ремонту балконов. ИСпользуется для расчета стоимости ремонта и остекления балкона.',
};

export const viewport: Viewport = {
  themeColor: '#f9c385',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const RootLayout: NextPage<Props> = ({ children }) => {
  return (
    <html lang="ru" className={globalFont.className}>
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
};

export default RootLayout;
