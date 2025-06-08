import React from 'react';
import { vi } from 'vitest';
import { FontVariant, SetterType } from '@/utils/types';
import * as TextSettingsContext from '@/contexts/TextSettingsContext';
import type { Action } from '@/contexts/TextSettingsContext';

export const FakeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = React.useState({
    fontFamily: 'Inter',
    text: '',
    fontSize: 16,
    fontVariant: FontVariant.REGULAR,
  });

  const fakeSetter = (action: Action) => {
    setSettings((prev) => {
      switch (action.type) {
        case SetterType.SetText:
          return { ...prev, text: action.payload };
        case SetterType.SetFontFamily:
          return { ...prev, fontFamily: action.payload };
        case SetterType.SetFontSize:
          return { ...prev, fontSize: action.payload };
        case SetterType.SetFontVariant:
          return { ...prev, fontVariant: action.payload as FontVariant };
        default:
          return prev;
      }
    });
  };

  // Override useTextSettings to use a stateful value.
  vi.spyOn(TextSettingsContext, 'useTextSettings').mockReturnValue([
    settings,
    fakeSetter,
  ]);

  return <>{children}</>;
};
