"use client";

import { useEffect, useState } from "react";

import { catalogApi, type CatalogItem, type CatalogKind } from "./index";

export function useCatalog(kind: CatalogKind, refreshKey?: unknown) {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    catalogApi
      .list(kind)
      .then((data) => {
        if (cancelled) return;
        setItems(data);
        setError("");
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
}
