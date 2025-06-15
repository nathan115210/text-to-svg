'use client';
import React, { useEffect, useState } from 'react';
import { useTextSettings } from '@/contexts/TextSettingsContext';
import { loadFont, svgPathData } from '@/utils/helpers';

export default function SvgPreview() {
  const { settings: textSettings } = useTextSettings();
  const [path, setPath] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const font = await loadFont(textSettings.fontFamily);
        setPath(svgPathData(font, textSettings));
      } catch (e) {
        console.error('Font load / SVG gen failed', e);
        setPath(null);
      }
    })();
  }, [textSettings.fontFamily]); // Only re-run when fontFamily changes

  return (
    <svg width="100%" height="150" viewBox="0 0 1000 200">
      {path && <path d={path} fill="white" />}
    </svg>
  );
}
