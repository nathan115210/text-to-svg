'use client';

import { useEffect, useReducer } from 'react';
import { TextSettings, FontVariant } from '@/types/types';
import { loadFont } from '@/utils/helpers';

/* ---------- types ---------- */
interface Data {
  path: string;
  width: number;
  height: number;
  svg: string;
}

type State =
  | { phase: 'loading' }
  | ({ phase: 'ready' } & Data)
  | { phase: 'error'; message: string }
  | { phase: 'empty_text'; message: string };

type Action =
  | { type: 'START' }
  | ({ type: 'SUCCESS' } & Data)
  | { type: 'ERROR'; message: string }
  | { type: 'EMPTY_TEXT'; message: string };

const reducer = (_: State, a: Action): State => {
  switch (a.type) {
    case 'START':
      return { phase: 'loading' };
    case 'SUCCESS':
      return { phase: 'ready', ...a };
    case 'ERROR':
      return { phase: 'error', message: a.message };
    case 'EMPTY_TEXT':
      return { phase: 'empty_text', message: 'Text cannot be empty' };
  }
};

export function useSvgBuild(settings: TextSettings): State {
  const [state, dispatch] = useReducer(reducer, { phase: 'loading' });

  useEffect(() => {
    let cancelled = false;
    dispatch({ type: 'START' });

    if (!settings.text) {
      dispatch({ type: 'EMPTY_TEXT', message: 'Text cannot be empty' });
    } else {
      (async () => {
        try {
          const font = await loadFont(settings.fontFamily);

          /*  build path at baseline y = 0 */
          const p = font.getPath(settings.text, 0, 0, settings.fontSize);

          /* exact bounding-box (can be negative above baseline) */
          const bb = p.getBoundingBox(); // { x1, y1, x2, y2 }
          const width = +(bb.x2 - bb.x1).toFixed(3);
          const height = +(bb.y2 - bb.y1).toFixed(3);

          /*  translate every command so top-left becomes 0,0 */
          const dx = -bb.x1;
          const dy = -bb.y1;
          for (const c of p.commands) {
            if (c.x !== undefined) c.x += dx;
            if (c.y !== undefined) c.y += dy;
            if (c.x1 !== undefined) c.x1 += dx;
            if (c.y1 !== undefined) c.y1 += dy;
            if (c.x2 !== undefined) c.x2 += dx;
            if (c.y2 !== undefined) c.y2 += dy;
          }
          const d = p.toPathData(2);

          /*  filters for faux-bold / faux-light */
          const filter =
            settings.fontVariant === FontVariant.BOLD
              ? 'url(#faux-bold)'
              : settings.fontVariant === FontVariant.LIGHT
                ? 'url(#faux-light)'
                : undefined;

          /* SVG markup */
          const svg =
            `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg"><defs><filter id="faux-bold"><feMorphology operator="dilate" radius="1"/></filter><filter id="faux-light"><feMorphology operator="erode" radius="0.75"/></filter></defs><path d="${d}" fill="currentColor"${filter ? ` filter="${filter}"` : ''}/></svg>`.trim();

          if (!cancelled) {
            dispatch({ type: 'SUCCESS', path: d, width, height, svg });
          }
        } catch (err: unknown) {
          if (!cancelled) {
            dispatch({
              type: 'ERROR',
              message: (err as Error)?.message ?? 'Unknown error',
            });
          }
        }
      })();
    }

    return () => {
      cancelled = true;
    };
  }, [settings]);

  return state;
}
