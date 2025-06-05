'use client';
import { TextSettingsProvider } from '@/contexts/TextSettingsContext';

export default function ClientTextSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TextSettingsProvider>{children}</TextSettingsProvider>;
}
