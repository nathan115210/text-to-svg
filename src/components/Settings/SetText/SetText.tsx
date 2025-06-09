'use client';
import InputBox from '@/components/InputBox/InputBox';
import React from 'react';
import { useTextSettings } from '@/contexts/TextSettingsContext';

export default function SetText({ label }: { label: string }) {
  const { settings, textSetter } = useTextSettings();
  const defaultText = settings.text || '';
  const [fontSize, setFontSize] = React.useState<string>(defaultText);

  const onChangeHandler = (value: number | string) => {
    const text = typeof value === 'string' ? value : String(value);

    textSetter(text);
    setFontSize(text);
  };
  return (
    <InputBox
      name="text"
      label={label}
      value={fontSize}
      onChange={onChangeHandler}
      type={'text'}
      placeholder={'Set Text here...'}
      required={true}
    />
  );
}
