'use client';

import React from 'react';
import { useTextSettings } from '@/contexts/TextSettingsContext';
import Skeleton, { SkeletonType } from '@/components/Skeleton/Skeleton';
import Select from '@/components/Select/Select';
import { firstLetterToUpperCase } from '@/utils/helpers';
import { useFonts } from '@/hooks/useFonts';

export default function SetFontFamily({ label }: { label: string }) {
  const { settings, fontFamilySetter } = useTextSettings();
  const id = React.useId();
  const defaultValue = settings.fontFamily || 'Inter';
  const [selectedFont, setSelectedFont] = React.useState(defaultValue);

  const fonts = useFonts(100);

  const onChange = (value: string) => {
    setSelectedFont(value);
    fontFamilySetter(value);
  };

  return (
    <div className="set-font-family">
      {!fonts ? (
        <Skeleton variant={SkeletonType.Select} />
      ) : (
        <Select
          id={id}
          label={label}
          value={selectedFont}
          onChange={onChange}
          options={fonts}
          defaultValue={firstLetterToUpperCase(defaultValue)}
          dropdownGroupLabel="Fonts"
        />
      )}
    </div>
  );
}
