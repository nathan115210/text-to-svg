'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
  useMemo,
  useCallback,
} from 'react';
import { FontVariant, SetterType } from '@/utils/types';

/** ------ Action union ------ */
export type Action =
  | { type: SetterType.SetText; payload: string }
  | { type: SetterType.SetFontFamily; payload: string }
  | { type: SetterType.SetFontSize; payload: number }
  | { type: SetterType.SetFontVariant; payload: FontVariant };

/** ------ settings shape ------ */
export type TextSettings = {
  text: string;
  fontFamily: string;
  fontSize: number;
  fontVariant: FontVariant;
};

export const defaultTextSettings: TextSettings = {
  text: 'Hello',
  fontFamily: 'Inter',
  fontSize: 16,
  fontVariant: FontVariant.REGULAR,
};

/** ------ Reducer ------ */
function settingsReducer(settings: TextSettings, action: Action): TextSettings {
  switch (action.type) {
    case SetterType.SetText:
      return { ...settings, text: action.payload };
    case SetterType.SetFontFamily:
      return { ...settings, fontFamily: action.payload };
    case SetterType.SetFontSize:
      return { ...settings, fontSize: action.payload };
    case SetterType.SetFontVariant:
      return { ...settings, fontVariant: action.payload as FontVariant };
    default:
      return settings;
  }
}

export interface TextSettingsCtxProps {
  settings: TextSettings;
  textSetter: (t: string) => void;
  fontFamilySetter: (f: string) => void;
  fontSizeSetter: (n: number) => void;
  fontVariantSetter: (v: FontVariant) => void;
}

/** ------ Context ------ */
const TextSettingsCtx = createContext<TextSettingsCtxProps | undefined>(
  undefined,
);

/** ------ Provider ------ */
function init(): TextSettings {
  //TODO: read from localStorage or fallback to defaults
  return (
    JSON.parse(localStorage.getItem('textSettings')!) || defaultTextSettings
  );
}

export function TextSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, dispatch] = useReducer(settingsReducer, undefined, init);

  // Wrap dispatchers in stable callbacks
  const textSetter = useCallback((t: string) => {
    dispatch({ type: SetterType.SetText, payload: t });
  }, []);
  const fontFamilySetter = useCallback((f: string) => {
    dispatch({ type: SetterType.SetFontFamily, payload: f });
  }, []);
  const fontSizeSetter = useCallback((n: number) => {
    dispatch({ type: SetterType.SetFontSize, payload: n });
  }, []);
  const fontVariantSetter = useCallback((v: FontVariant) => {
    dispatch({ type: SetterType.SetFontVariant, payload: v });
  }, []);

  // Memoize the context value
  const value: TextSettingsCtxProps = useMemo(
    () => ({
      settings,
      textSetter,
      fontFamilySetter,
      fontSizeSetter,
      fontVariantSetter,
    }),
    [settings, textSetter, fontFamilySetter, fontSizeSetter, fontVariantSetter],
  );

  return (
    <TextSettingsCtx.Provider value={value}>
      {children}
    </TextSettingsCtx.Provider>
  );
}

/** ------ Hook ------ */
export function useTextSettings() {
  const ctx = useContext(TextSettingsCtx);
  if (!ctx) {
    throw new Error('useTextSettings must be used inside TextSettingsProvider');
  }
  return ctx;
}
