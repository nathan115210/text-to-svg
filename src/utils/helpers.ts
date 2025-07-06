import opentype, { Font } from 'opentype.js';
import { createStore, get, set } from 'idb-keyval';
import { FontVariant } from '@/types/types';

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

  // save new fetched font to in-memory cache
  fontsCache.set(key, font);
  return font;
}

export const fontVariantMap: Record<FontVariant, number> = {
  regular: 400,
  bold: 700,
  light: 300,
} as const;

// Helper function to trigger a download of a Blob
export function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Take a raw SVG string (with any width/height/viewBox),
 * strip out the outer <svg> wrapper, and re-wrap it with
 * the given dimensions.
 */
export function generateSvgBlob(
  rawSvg: string,
  width: number,
  height: number,
): Blob {
  // 1. grab the inner content of the incoming SVG
  //    everything between the opening <svg…> and closing </svg>
  const match = rawSvg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
  const inner = match ? match[1] : rawSvg;

  // 2. build a fresh SVG with new size + viewBox
  const svg = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${width}"
      height="${height}"
      viewBox="0 0 ${width} ${height}"
    >
      ${inner}
    </svg>
  `.trim();

  // 3. return a Blob you can download
  return new Blob([svg], { type: 'image/svg+xml' });
}
