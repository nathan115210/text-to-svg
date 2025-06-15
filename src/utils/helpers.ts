import opentype, { Font } from 'opentype.js';
import { createStore, get, set } from 'idb-keyval';
import { FontVariant, type TextSettings } from '@/types/types';

export const firstLetterToUpperCase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const fontsStore = createStore('FontDB', 'fonts'); // dbName, storeName

/**
 * Load or retrieve a parsed Fonts
 *  - key:  `${fontFamily.toLowerCase()}`
 *  - cache: IndexedDB + in-memory Map for the current session
 */
const fontsCache = new Map<string, Font>();

export async function loadFont(fontFamily: string): Promise<Font> {
  const key = fontFamily.toLowerCase();

  if (fontsCache.has(key)) return fontsCache.get(key)!;

  /* IndexedDB (persistent across reloads) */
  const cachedBuffer = await get<ArrayBuffer>(key, fontsStore);
  if (cachedBuffer) {
    const f = opentype.parse(cachedBuffer);
    fontsCache.set(key, f);
    return f;
  }

  /*  fetch fonts from API "/api/font-buffer" */
  const url = '/api/font-buffer?' + new URLSearchParams({ font: fontFamily });
  console.log('Fetching font from API:', fontFamily);
  const res = await fetch(url, { cache: 'no-store' });

  const ct = res.headers.get('content-type') ?? '';
  const isFont =
    ct.startsWith('font') || ct.startsWith('application/octet-stream');

  if (!res.ok || !isFont) {
    const msg = await res.text().catch(() => '');
    throw new Error(`Font API failed (${res.status}): ${msg}`);
  }

  const buffer = await res.arrayBuffer();

  /* Persist buffer for next time */
  try {
    await set(key, buffer, fontsStore);
  } catch {}

  const font = opentype.parse(buffer);

  // save new fecthed font to in-memory cache
  fontsCache.set(key, font);
  return font;
}

export function svgPathData(font: Font, textSettings: TextSettings): string {
  const { text, fontSize } = textSettings;

  const path = font.getPath(text, 0, fontSize, fontSize); // x = 0, y = baseline
  return path.toPathData(2); // 2-decimal precision
}

export const fontVariantMap: Record<FontVariant, number> = {
  regular: 400,
  bold: 700,
  light: 300,
} as const;
