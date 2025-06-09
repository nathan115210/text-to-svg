'use client';
import React from 'react';
import Select from '@/components/Select/Select';
import { FontVariant } from '@/utils/types';
import { useTextSettings } from '@/contexts/TextSettingsContext';
import { firstLetterToUpperCase } from '@/utils/helpers';

export default function SetFontVariant({ label }: { label: string }) {
  const id = React.useId();
  const { settings, fontVariantSetter } = useTextSettings();
  const defaultVariant = settings.fontVariant || FontVariant.REGULAR;
  const [selectedVariant, setVariant] = React.useState<string>(defaultVariant);

  const variantOptions = Object.values(FontVariant).map((variant) =>
    firstLetterToUpperCase(variant),
  );

  const handleOnChange = (value: string) => {
    setVariant(value);
    fontVariantSetter(value as FontVariant);
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
