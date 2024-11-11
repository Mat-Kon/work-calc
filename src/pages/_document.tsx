import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <link rel="manifest" href="./manifest.json" />
        <meta
          name="description"
          content="Приложение для мастеров по ремонту балконов. ИСпользуется для расчета стоимости ремонта и остекления балкона."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
