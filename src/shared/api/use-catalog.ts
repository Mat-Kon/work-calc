'use client';
import { useEffect, useState } from 'react';
import type { IServiceItemData } from '@/shared/types/my-services';
import { catalogApi, type CatalogKind } from './index';

export const useCatalog = (kind: CatalogKind, refreshKey?: unknown) => {
  const [items, setItems] = useState<IServiceItemData[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    catalogApi
      .list(kind)
      .then((data) => {
        if (cancelled) return;
        setItems(data);
        setError('');
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [kind, refreshKey]);

  return { items, setItems, isLoading, error };
};
