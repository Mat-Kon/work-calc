import Link from 'next/link';

export default function Calculate() {
  return (
    <>
      <h1>Расчет стоимости</h1>

      <nav>
        <Link href={'calculate/add'}>Добавить услугу</Link>
      </nav>

      <ul>Список услуг</ul>
    </>
  );
}
