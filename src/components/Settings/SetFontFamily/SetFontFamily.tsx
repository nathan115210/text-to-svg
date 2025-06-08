'use client';

import React, { useState, useEffect } from 'react';
import { useTextSettings } from '@/contexts/TextSettingsContext';
import { SetterType } from '@/utils/types';
import Skeleton, { SkeletonType } from '@/components/Skeleton/Skeleton';
import Select from '@/components/Select/Select';
import { firstLetterToUpperCase } from '@/utils/helpers';

const SetFontFamily = ({ label }: { label: string }) => {
  const [data, setter] = useTextSettings();
  const [fonts, setFonts] = useState<string[] | null>(null);
  const defaultValue = data.fontFamily || 'Inter';
  const [selectedFont, setSelectedFont] = useState<string>(defaultValue);
  const id = React.useId();
  const onChange = (value: string) => {
    setSelectedFont(value);
    setter({ type: SetterType.SetFontFamily, payload: value });
  };

  useEffect(() => {
    const fetchFonts = async () => {
      try {
        await fetch('/api/fonts')
          .then((res) => res.json())
          .then((fontFamilies) => setFonts(fontFamilies.slice(0, 100)));
      } catch (error) {
        console.error('Error fetching fonts', error);
      }
    };

    fetchFonts();
  }, []);

  return (
    <div>
      {/*//TODO: move teh skeleton to the Layout.tsx*/}
      {!fonts ? (
        <Skeleton variant={SkeletonType.Select} />
      ) : (
        <>
          <Select
            id={id}
            label={label}
            value={selectedFont}
            onChange={onChange}
            options={fonts}
            defaultValue={firstLetterToUpperCase(defaultValue)}
            dropdownGroupLabel="Fonts"
          />
        </>
      )}
    </div>
  );
};
export default SetFontFamily;
