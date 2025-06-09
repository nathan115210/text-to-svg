'use client';

import React, { useMemo, useEffect, useRef, useState } from 'react';
import { vi } from 'vitest';
import * as TextSettingsContextModule from '@/contexts/TextSettingsContext'; // ✅ ES-module import
import { SetterType, FontVariant } from '@/utils/types';
import type { Action } from '@/contexts/TextSettingsContext';

export const FakeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState({
    fontFamily: 'Inter',
    text: '',
    fontSize: 16,
    fontVariant: FontVariant.REGULAR,
  });

  const dispatch = (action: Action) =>
    setSettings((prev) => {
      switch (action.type) {
        case SetterType.SetText:
          return { ...prev, text: action.payload };
        case SetterType.SetFontFamily:
          return { ...prev, fontFamily: action.payload };
        case SetterType.SetFontSize:
          return { ...prev, fontSize: action.payload };
        case SetterType.SetFontVariant:
          return { ...prev, fontVariant: action.payload };
        default:
          return prev;
      }
    });

  const fakeContextValue = useMemo(
    () => ({
      settings,
      textSetter: (t: string) =>
        dispatch({ type: SetterType.SetText, payload: t }),
      fontFamilySetter: (f: string) =>
        dispatch({ type: SetterType.SetFontFamily, payload: f }),
      fontSizeSetter: (n: number) =>
        dispatch({ type: SetterType.SetFontSize, payload: n }),
      fontVariantSetter: (v: FontVariant) =>
        dispatch({ type: SetterType.SetFontVariant, payload: v }),
    }),
    [settings],
  );

  // Create the spy only once
  const spyRef = useRef(vi.spyOn(TextSettingsContextModule, 'useTextSettings'));

  // Update the spy's return value whenever the fake context value changes
  useEffect(() => {
    spyRef.current.mockReturnValue(fakeContextValue as never);
  }, [fakeContextValue]);

  return <>{children}</>;
};
