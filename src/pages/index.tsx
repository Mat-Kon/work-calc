import Head from 'next/head';
// import Image from "next/image";
// import localFont from "next/font/local";

export default function Home() {
  return (
    <>
      <Head>
        <title>Balcony calc</title>
        <meta
          name="description"
          content="Приложение для мастеров по ремонту балконов. ИСпользуется для расчета стоимости ремонта и остекления балкона."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
