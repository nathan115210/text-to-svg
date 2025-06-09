import React from 'react';
import './page.scss';
import SettingsGroup from '@/components/SettingsGroup/SettingsGroup';

export default function Home() {
  return (
    <main className="page-container">
      <SettingsGroup />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {/* Log cards will be rendered here */}
        <p>card carda card</p>
      </div>
    </main>
  );
}
