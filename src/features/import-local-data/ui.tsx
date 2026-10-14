'use client';
import { useEffect, useState } from 'react';
import { countLocalData, importAll } from '@/shared/lib/import-local-data';

// Показывается только если в этом браузере остались старые данные
export const ImportLocalDataBtn: React.FC = () => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setCount(countLocalData());
  }, []);

  const handleClick = async () => {
    setLoading(true);
    try {
      const { catalog, orders, failed } = await importAll();
      setMessage(
        `Перенесено: услуг и материалов ${catalog}, заказов ${orders}` +
          (failed ? `. Не удалось перенести заказов: ${failed}` : '')
      );
      setCount(countLocalData());
    } catch (e) {
      setMessage(e instanceof Error ? `Ошибка: ${e.message}` : 'Не удалось перенести данные');
    } finally {
      setLoading(false);
    }
  };

  if (count === 0 && !message) return null;

  return (
    <div>
      {count > 0 && (
        <button type="button" onClick={handleClick} disabled={isLoading}>
          {isLoading ? 'Переносим...' : `Перенести данные из браузера (${count})`}
        </button>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};
