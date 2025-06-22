// src/hooks/useDebouncedCallback.ts
import { useRef, useCallback } from 'react';

/**
 * Returns a debounced version of the callback.
 * New calls within `delay` reset the timer.
 */
export function useDebouncedCallback<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay = 300,
) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: Args) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => fn(...args), delay);
    },
    [fn, delay],
  );
}
