import { useEffect, useState } from "react";
import { setCache, getCache } from "../utils/cache";

interface UseCachedFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refresh: () => void;
}

export function useCachedFetch<T = any>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs: number = 60 * 60 * 1000 // 1 hour
): UseCachedFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refreshIndex, setRefreshIndex] = useState(0);

  const refresh = () => setRefreshIndex((i) => i + 1);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      const cached = getCache(key);
      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }
      try {
        const result = await fetcher();
        if (!cancelled) {
          setData(result);
          setCache(key, result, ttlMs);
        }
      } catch (err: any) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [key, ttlMs, refreshIndex]);

  return { data, loading, error, refresh };
}
