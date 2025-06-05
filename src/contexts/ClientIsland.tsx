'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const ClientProvider = dynamic(
  () => import('@/contexts/ClientTextSettingsProvider'),
  {
    ssr: false,
  },
);

export default function ClientIsland({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientProvider>{children}</ClientProvider>;
}
