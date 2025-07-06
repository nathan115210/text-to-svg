import React from 'react';
import SettingsGroup from '@/components/SettingsGroup/SettingsGroup';
import SvgPanel from '@/components/SvgPanel/SvgPanel';

export default function Home() {
  return (
    <main className="page-container">
      <SettingsGroup />
      <SvgPanel />
    </main>
  );
}
