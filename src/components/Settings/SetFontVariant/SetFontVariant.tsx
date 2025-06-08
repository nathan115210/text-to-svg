'use client';
import React from 'react';
import Select from '@/components/Select/Select';
import { FontVariant, SetterType } from '@/utils/types';
import { useTextSettings } from '@/contexts/TextSettingsContext';
import { firstLetterToUpperCase } from '@/utils/helpers';

export default function SetFontVariant({ label }: { label: string }) {
  const id = React.useId();
  const [data, setter] = useTextSettings();
  const defaultVariant = data.fontVariant || FontVariant.REGULAR;
  const [selectedVariant, setVariant] = React.useState<string>(defaultVariant);

  const variantOptions = Object.values(FontVariant).map((variant) =>
    firstLetterToUpperCase(variant),
  );
  const handleOnChange = (value: string) => {
    setVariant(value);
    setter({ type: SetterType.SetFontVariant, payload: value });
  };
  return (
    <Select
      id={id}
      label={label}
      value={selectedVariant}
      onChange={handleOnChange}
      options={variantOptions}
      defaultValue={firstLetterToUpperCase(defaultVariant)}
      dropdownGroupLabel="Font Variant"
      data-testid="font-variant-select"
    />
  );
}
