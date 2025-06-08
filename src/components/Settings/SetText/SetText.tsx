'use client';
import InputBox from '@/components/InputBox/InputBox';
import React from 'react';
import { useTextSettings } from '@/contexts/TextSettingsContext';
import { SetterType } from '@/utils/types';

export default function SetText({ label }: { label: string }) {
  const [settings, setter] = useTextSettings();
  const defaultText = settings.text || '';
  const [fontSize, setFontSize] = React.useState<string>(defaultText);

  const onChangeHandler = (value: number | string) => {
    const text = typeof value === 'string' ? value : String(value);

    setter({ type: SetterType.SetText, payload: text });
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
