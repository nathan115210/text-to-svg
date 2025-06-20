'use client';

import { useCallback, useState } from 'react';

/**
 * useClipboard
 * • copy(text) → Promise<boolean>
 * • copied     → true for `feedbackMs` ms after a successful copy
 * Works only in browsers that support `navigator.clipboard.writeText`.
 * Logs a warning otherwise.
 */
export function useClipboard(feedbackMs = 1500) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      if (!navigator.clipboard?.writeText) {
        console.warn('Clipboard not supported');
        return false;
      }
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), feedbackMs);
        return true;
      } catch (err) {
        console.warn('Clipboard write failed', err);
        return false;
      }
    },
    [feedbackMs],
  );

  return { copy, copied };
}
