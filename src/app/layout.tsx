import { type Metadata, type Viewport } from "next";
import localFont from "next/font/local";
import { type ReactNode } from "react";

import { AppLayout } from "@/shared/app-layout";
import { Providers } from "@/shared/providers";

import "../styles/main.scss";

const globalFont = localFont({
  src: "./fonts/GeistMonoVF.woff",
  display: "swap",
  preload: true,
  variable: "--font-mono",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

const THEME_COLOR = "#f5862f";

export const metadata: Metadata = {
  title: {
    default: "MKcalc",
    template: "%s · MKcalc",
  },
  description:
    "Приложение для мастеров по ремонту балконов. Используется для расчета стоимости ремонта и остекления балкона.",
  applicationName: "MKcalc",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLOR },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLOR },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={globalFont.className} suppressHydrationWarning>
      <body>
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
}
