'use client';
import { useEffect, useState } from 'react';
import { countLocalCatalog, importCatalog } from '@/shared/lib/import-local-data';

// Показывается только если в этом браузере остались старые услуги/материалы
export const ImportLocalDataBtn: React.FC = () => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setCount(countLocalCatalog());
  }, []);

  const handleClick = async () => {
    setLoading(true);
    try {
      const imported = await importCatalog();
      setMessage(`Перенесено записей: ${imported}`);
      setCount(0);
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
          {isLoading ? 'Переносим...' : `Перенести услуги и материалы из браузера (${count})`}
        </button>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};
