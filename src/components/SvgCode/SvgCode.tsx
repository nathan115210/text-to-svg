'use client';
import './SvgCode.scss';
import React, { useState } from 'react';
import { useTextSettings } from '@/contexts/TextSettingsContext';
import { useSvgBuild } from '@/hooks/useSvgPath';
import { useClipboard } from '@/hooks/useClipboard';
import Skeleton, { SkeletonType } from '@/components/Skeleton/Skeleton';
import { useDownload } from '@/hooks/useDownload';
import { Cta } from '@/components/Cta/Cta';
import BottomSheetModal from '@/components/BottomSheetModal/BottomSheetModal';
import PresetExportPanel from '@/components/PresetExpoertPanel/PresetExpoertPanel';

export default function SvgCode() {
  const { settings } = useTextSettings();
  const svgState = useSvgBuild(settings);
  const { copy, copied } = useClipboard();
  const { isDownloaded, download } = useDownload();
  const [openExportModal, setOpenExportModal] = useState(false);
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
        <Cta onClick={() => copy(svgState.svg)}>
          {`Copy To Clipboard${copied ? ' ✅' : ''}`}
        </Cta>
        <Cta onClick={() => download(svgState.svg)}>
          {`Download SVG ${isDownloaded ? ' ✅' : ''}`}
        </Cta>
        <Cta onClick={() => setOpenExportModal(true)}>Export Presets</Cta>
        {/*Export Presets panel*/}
        <BottomSheetModal
          defaultOpen={openExportModal}
          onClose={() => setOpenExportModal(false)}
          hideTrigger
        >
          <PresetExportPanel />
        </BottomSheetModal>
      </div>
    </div>
  );
}
