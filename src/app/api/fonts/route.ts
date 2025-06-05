import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GOOGLE_FONTS_API_KEY;
  const apiUrl = `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch fonts' },
      { status: 500 },
    );
  }
  const data = await response.json();
  // Return only family names to reduce payload
  const fontFamilies = data.items.map(
    (item: { family: string }) => item.family as string,
  );

  return NextResponse.json(fontFamilies);
}
