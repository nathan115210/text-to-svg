'use client';
import InputBox from '@/components/InputBox/InputBox';
import React from 'react';
import { useTextSettings } from '@/contexts/TextSettingsContext';
import { SetterType } from '@/utils/types';

export default function SetFontSize({
  label,
  unit = 'px',
}: {
  label: string;
  unit?: string;
}) {
  const [settings, setter] = useTextSettings();
  const defaultFontSize = settings.fontSize || 16;
  const [fontSize, setFontSize] = React.useState<number>(defaultFontSize);

  const onChangeHandler = (value: number | string) => {
    const n = typeof value === 'number' ? value : Number(value);

    setter({ type: SetterType.SetFontSize, payload: n });
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
