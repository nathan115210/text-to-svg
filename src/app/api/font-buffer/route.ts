import { NextRequest, NextResponse } from 'next/server';

/* GET /api/font-buffer?font=Inter */
export async function GET(req: NextRequest) {
  const fontFamily = new URL(req.url).searchParams.get('font');
  if (!fontFamily) {
    return NextResponse.json({ error: 'font param missing' }, { status: 400 });
  }

  try {
    /* fetch Google-Fonts CSS (weight 400 by default) */
    const css = await fetch(cssUrl(fontFamily), {
      headers: { 'User-Agent': 'Mozilla/5.0' }, // helps some families
    }).then((r) => r.text());

    /* extract a .woff2 or .woff URL */
    const regex =
      /url\(["']?\s*(https:\/\/fonts\.gstatic\.com\/[^)"']+\.(?:woff2?|ttf))\s*["']?\)/m;

    let fontUrl: string | undefined;
    const match = css.match(regex);
    if (match) {
      fontUrl = match[1];
    } else {
      /*  very rare: fall back to “first gstatic URL” */
      const fallback = css.match(/https:\/\/fonts\.gstatic\.com\/[^\s)'"\\]+/);
      if (fallback) fontUrl = fallback[0];
    }

    if (!fontUrl) {
      return NextResponse.json(
        { error: `Font URL not found – ${fontFamily}` },
        { status: 400 },
      );
    }

    /* download the font binary */
    const resp = await fetch(fontUrl);
    if (!resp.ok || !resp.headers.get('content-type')?.includes('font')) {
      return NextResponse.json(
        { error: `Google Fonts returned ${resp.status}` },
        { status: 502 },
      );
    }

    const buffer = await resp.arrayBuffer();

    /* stream buffer to client */
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Cache-Control': 'public, max-age=604800', // 1 week
      },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to load font' }, { status: 500 });
  }
}

/* helper: build CSS URL (weight 400 default) */
const cssUrl = (family: string) =>
  `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family,
  ).replace(/%20/g, '+')}&display=swap`;
