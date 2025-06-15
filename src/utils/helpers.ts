import opentype, { Font } from 'opentype.js';
import { FontVariant, type TextSettings } from '@/types/types';

export const firstLetterToUpperCase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

//TODO cache parsed fonts in the browser

/** Fetch font buffer from our API and parse with opentype.js */
export async function loadFont(fontFamily: string): Promise<Font> {
  const url = '/api/font-buffer?' + new URLSearchParams({ font: fontFamily });
  const res = await fetch(url, { cache: 'no-store' });

  // ✅ accept the new MIME
  const ct = res.headers.get('content-type') ?? '';
  const isFont =
    ct.startsWith('font') || ct.startsWith('application/octet-stream');

  if (!res.ok || !isFont) {
    // try to read error JSON/text for debugging, but ignore if not JSON
    let msg = '';
    try {
      msg = await res.text();
    } catch (_) {
      /* ignore */
    }
    throw new Error(`Font API failed (${res.status}): ${msg}`);
  }

  const buffer = await res.arrayBuffer();
  return opentype.parse(buffer);
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
