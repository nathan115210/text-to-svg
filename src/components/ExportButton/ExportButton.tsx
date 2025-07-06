'use client';

import { useActionState } from 'react';
import { Cta } from '../Cta/Cta';
import { Preset } from '../PresetExpoertPanel/PresetExpoertPanel';
import { generateSvgBlob, triggerDownload } from '@/utils/helpers';

interface ExportButtonProps {
  preset: Preset;
  svgSource: string;
  disabled?: boolean;
  /** parent will call startTransition(() => dispatch(preset)) */
  onAction: (actionFn: (p: Preset) => void) => void;
}

enum ExportStatus {
  Idle = 'idle',
  Pending = 'pending',
  Done = 'done',
  Error = 'error',
}

export default function ExportButton(props: ExportButtonProps) {
  const { preset, svgSource, disabled = false, onAction } = props;

  const [status, dispatch] = useActionState<ExportStatus, Preset>(
    async (_prev, preset) => exportSvg(svgSource, preset),
    ExportStatus.Idle, // Pass the initially preset object
  );

  const labels: Record<ExportStatus, string> = {
    idle: `Export ${preset.name}`,
    pending: `Exporting ${preset.name}…`,
    done: `${preset.name} ✓`,
    error: `${preset.name} ✗`,
  };
  console.log('status', status);
  return (
    <Cta
      className={`export-btn export-${status}`}
      disabled={
        disabled ||
        status === ExportStatus.Pending ||
        status === ExportStatus.Done
      }
      onClick={() => onAction(dispatch)}
    >
      {labels[status]}
    </Cta>
  );
}

// helper
async function exportSvg(
  svgSource: ExportButtonProps['svgSource'],
  preset: Preset,
): Promise<ExportStatus> {
  const { width, height, name } = preset;
  try {
    const blob = generateSvgBlob(svgSource, width, height);
    triggerDownload(blob, `text-to-svg-${name}.svg`);
    return ExportStatus.Done;
  } catch (error) {
    console.error('Export failed:', error);
    return ExportStatus.Error;
  }
}
