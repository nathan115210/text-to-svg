import { useEffect } from 'react';

export function useEscapeKey(handler: (event: KeyboardEvent) => void) {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      // Modern browsers: key === 'Escape'
      if (event.key === 'Escape') {
        handler(event);
      }
    };

    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [handler]);
}
