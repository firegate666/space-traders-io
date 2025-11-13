import { useCallback, useEffect, useState } from 'react';
import { isApiError } from '../services/api';

interface UseApiQueryOptions<TData> {
  enabled?: boolean;
  immediate?: boolean;
  transform?: (data: TData) => TData;
  dependencies?: ReadonlyArray<unknown>;
}

export const useApiQuery = <TData>(
  fn: () => Promise<TData>,
  { enabled = true, immediate = true, transform, dependencies = [] }: UseApiQueryOptions<TData> = {}
) => {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    if (!enabled) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await fn();
      setData(transform ? transform(result) : result);
    } catch (err) {
      if (isApiError(err)) {
        setError(err.error.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }
    } finally {
      setLoading(false);
    }
  }, [enabled, fn, transform]);

  useEffect(() => {
    if (immediate) {
      void execute();
    }
  }, [execute, immediate, ...dependencies]);

  return { data, loading, error, refetch: execute };
};
