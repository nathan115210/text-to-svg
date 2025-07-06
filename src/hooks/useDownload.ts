'use client';

import { useCallback, useState } from 'react';
import { triggerDownload } from '@/utils/helpers';

/**
 * useDownload
 * • download(data, filename) → void
 * • copied → true for `feedbackMs` ms after successful download
 * Downloads data as a svg file with the specified filename.
 * Uses Blob and URL.createObjectURL for cross-browser compatibility.
 */

export function useDownload(feedbackMs = 1500) {
  const [isDownloaded, setDownloaded] = useState(false);

  const download = useCallback(
    async (svgData: string) => {
      try {
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        triggerDownload(blob, 'text-to-svg.svg');
        setDownloaded(true);
        setTimeout(() => setDownloaded(false), feedbackMs);
      } catch (err) {
        console.warn('Download failed', err);
        return false;
      }
    },
    [feedbackMs],
  );

  return { isDownloaded, download };
}
