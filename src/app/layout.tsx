import ClientIsland from '@/contexts/ClientIsland';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import React from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/index.scss';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s – Text-to-SVG',
    default: 'Text-to-SVG – Convert text into crisp SVG',
  },
  description:
    'Free online tool to turn any text into scalable SVG files. Choose fonts, size, colour and download instantly.',
  metadataBase: new URL('https://wow-text-to-svg.vercel.app/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://https://wow-text-to-svg.vercel.app/',
    title: 'Text-to-SVG',
    description:
      'Turn any text into beautiful SVG. Adjust font, size and colour, preview live, download or copy code.',
    images: [
      {
        url: '/og.png', // 1200×630 <— upload in /public
        width: 1200,
        height: 630,
        alt: 'Text-to-SVG preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Zhao1115210',
    title: 'Text-to-SVG',
    description:
      'Convert text into crisp, customisable SVG right in your browser.',
    images: ['/og.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientIsland>
          {children}
          <SpeedInsights />
        </ClientIsland>
      </body>
    </html>
  );
}
