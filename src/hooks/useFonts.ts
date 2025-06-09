import { useState, useEffect } from 'react';

let _cachedFonts: string[] | null = null;

export function useFonts(limit = 100) {
  const [fonts, setFonts] = useState<string[] | null>(_cachedFonts);

  useEffect(() => {
    if (_cachedFonts) {
      // immediately use cached value
      setFonts(_cachedFonts);
      return;
    }

    // first time: fetch and cache
    fetch('/api/fonts')
      .then((res) => res.json())
      .then((list: string[]) => {
        _cachedFonts = list.slice(0, limit);
        setFonts(_cachedFonts);
      })
      .catch((err) => {
        console.error('Failed to load fonts:', err);
      });
  }, [limit]);

  return fonts;
}
