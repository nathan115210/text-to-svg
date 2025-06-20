// src/hooks/useDebouncedCallback.ts
import { useRef, useCallback } from 'react';

/**
 * Returns a debounced version of the callback.
 * New calls within `delay` reset the timer.
 */
export function useDebouncedCallback<T extends (...a: any[]) => void>(
  fn: T,
  delay = 300,
) {
  const timer = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => fn(...args), delay);
    },
    [fn, delay],
  );
}
