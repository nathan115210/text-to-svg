'use client';

import React from 'react';
import { useTextSettings } from '@/contexts/TextSettingsContext';
import './SvgPreview.scss';
import { useSvgBuild } from '@/hooks/useSvgPath';
import Skeleton, { SkeletonType } from '@/components/Skeleton/Skeleton';

export default function SvgPreview() {
  const { settings } = useTextSettings();
  const svgState = useSvgBuild(settings);

  if (svgState.phase === 'loading')
    return <Skeleton variant={SkeletonType.Panel} />;

  if (svgState.phase === 'empty_text' || svgState.phase === 'error')
    return (
      <div className="preview-container">
        <p className="preview-message">{svgState.message}</p>
      </div>
    );

  const { path, width, height } = svgState;

  return (
    <div className="preview-container">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <filter id="faux-bold">
            <feMorphology operator="dilate" radius="1" />
          </filter>
          <filter id="faux-light">
            <feMorphology operator="erode" radius="0.75" />
          </filter>
        </defs>
        <path d={path} fill="black" />
      </svg>
    </div>
  );
}
