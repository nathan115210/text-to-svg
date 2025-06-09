'use client';
import InputBox from '@/components/InputBox/InputBox';
import React from 'react';
import { useTextSettings } from '@/contexts/TextSettingsContext';

export default function SetFontSize({
  label,
  unit = 'px',
}: {
  label: string;
  unit?: string;
}) {
  const { settings, fontSizeSetter } = useTextSettings();
  const defaultFontSize = settings.fontSize || 16;
  const [fontSize, setFontSize] = React.useState<number>(defaultFontSize);

  const onChangeHandler = (value: number | string) => {
    const n = typeof value === 'number' ? value : Number(value);

    fontSizeSetter(n);
    setFontSize(n);
  };
  return (
    <InputBox
      name="font-size"
      label={label}
      value={fontSize}
      onChange={onChangeHandler}
      type={'number'}
      placeholder={'Set Font Size here...'}
      required={true}
      suffix={unit}
    />
  );
}
