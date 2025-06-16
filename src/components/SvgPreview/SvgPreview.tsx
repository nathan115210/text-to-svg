'use client';
import React, { useEffect, useState } from 'react';
import { useTextSettings } from '@/contexts/TextSettingsContext';
import { loadFont, svgPathData } from '@/utils/helpers';
import { FontVariant } from '@/types/types';

export default function SvgPreview() {
  const { settings } = useTextSettings();
  const [path, setPath] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const font = await loadFont(settings.fontFamily);
        setPath(svgPathData(font, settings));
      } catch (e) {
        console.error('Font load / SVG gen failed', e);
        setPath(null);
      }
    })();
  }, [settings]);

  const filter =
    settings.fontVariant === FontVariant.BOLD
      ? 'url(#faux-bold)'
      : settings.fontVariant === FontVariant.LIGHT
        ? 'url(#faux-light)'
        : undefined;

  return (
    <svg width="100%" height="150" viewBox="0 0 1000 200">
      <defs>
        <filter id="faux-bold">
          <feMorphology operator="dilate" radius="1" />
        </filter>
        <filter id="faux-light">
          <feMorphology operator="erode" radius="0.75" />
        </filter>
      </defs>
      {path && (
        <path d={path} fill="currentColor" {...(filter ? { filter } : {})} />
      )}
    </svg>
  );
}
