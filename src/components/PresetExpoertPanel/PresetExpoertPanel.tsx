'use client';

import React, { useTransition } from 'react';
import './PresetExportPanel.scss';
import ExportButton from '../ExportButton/ExportButton';
import { useTextSettings } from '@/contexts/TextSettingsContext';
import { useSvgBuild } from '@/hooks/useSvgPath';

export interface Preset {
  name: string;
  width: number;
  height: number;
}

// Pick whatever sizes make sense for your users:
const PRESETS: Preset[] = [
  { name: '16×16', width: 16, height: 16 },
  { name: '24×24', width: 24, height: 24 },
  { name: '32×32', width: 32, height: 32 },
  { name: '48×48', width: 48, height: 48 },
  { name: '64×64', width: 64, height: 64 },
  { name: '128×128', width: 128, height: 128 },
  { name: '256×256', width: 256, height: 256 },
  { name: '512×512', width: 512, height: 512 },
];

export default function PresetExportPanel() {
  const [isPending, start] = useTransition();
  const { settings } = useTextSettings();

  const svgState = useSvgBuild(settings);
  if (svgState.phase === 'loading' || svgState.phase === 'empty_text') {
    return <div className="preset-panel">Loading SVG…</div>;
  }

  if (svgState.phase === 'ready') {
    return (
      <div className="preset-panel">
        <h3>Export Presets</h3>
        <ul className="preset-list">
          {PRESETS.map((preset) => (
            <li key={preset.name} className="preset-item">
              <ExportButton
                preset={preset}
                svgSource={svgState.svg}
                disabled={isPending}
                onAction={(fn) => start(() => fn(preset))}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
