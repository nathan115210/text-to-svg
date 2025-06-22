'use client';
import './SvgCode.scss';
import React from 'react';
import { useTextSettings } from '@/contexts/TextSettingsContext';
import { useSvgBuild } from '@/hooks/useSvgPath';
import { useClipboard } from '@/hooks/useClipboard';
import Skeleton, { SkeletonType } from '@/components/Skeleton/Skeleton';
import { triggerDownload } from '@/utils/helpers';

export default function SvgCode() {
  const { settings } = useTextSettings();
  const svgState = useSvgBuild(settings);
  const { copy, copied } = useClipboard();

  if (svgState.phase === 'loading')
    return (
      <div className="code-col">
        <Skeleton variant={SkeletonType.Panel} />
        <div className="btn-row">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} variant={SkeletonType.Button} />
          ))}
        </div>
      </div>
    );

  if (svgState.phase === 'empty_text' || svgState.phase === 'error')
    return (
      <div className="code-col">
        <div className={'code-box'}>
          <p className="preview-message">{svgState.message}</p>
        </div>
      </div>
    );

  return (
    <div className={`code-col`}>
      <textarea readOnly className="code-box" value={svgState.svg} />
      <div className="btn-row">
        <button className="copy-button" onClick={() => copy(svgState.svg)}>
          {copied ? 'Copied!' : 'Copy To Clipboard'}{' '}
        </button>
        <button onClick={() => downloadSVG(svgState.svg)}>Download SVG</button>
      </div>
    </div>
  );
}

//Helper
const downloadSVG = (svgData: string) => {
  const blob = new Blob([svgData], { type: 'image/svg+xml' });
  triggerDownload(blob, 'text-to-svg.svg');
};
