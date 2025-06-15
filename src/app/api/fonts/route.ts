// api endpoint  => /api/fonts/route.ts
import { NextResponse } from 'next/server';

let fontsCache: string[] | null = null;

export async function GET() {
  // If we’ve already fetched once, reuse in‐memory cache
  if (!fontsCache) {
    try {
      const apiKey = process.env.GOOGLE_FONTS_API_KEY;
      const apiUrl = process.env.GOOGLE_FONTS_API_URL;
      const url = `${apiUrl}${apiKey}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Google Fonts API returned ${response.status}`);
      }
      const data = await response.json();
      fontsCache = data.items.map((item: { family: string }) => item.family);
    } catch (err) {
      console.error('Error fetching Google Fonts:', err);
      return NextResponse.json(
        { error: 'Failed to fetch fonts' },
        { status: 500 },
      );
    }
  }

  // Return the cached list and set Cache-Control headers
  return NextResponse.json(fontsCache, {
    status: 200,
    headers: {
      // CDN and browsers will cache for 24h (86400s),
      // and serve stale while revalidating in the background for 1h.
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
    },
  });
}
