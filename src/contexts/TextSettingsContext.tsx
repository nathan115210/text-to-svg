'use client';

import React, {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import {
  type Action,
  FontVariant,
  SetterType,
  type TextSettings,
} from '@/types/types';

export const defaultTextSettings: TextSettings = {
  text: 'Hello',
  fontFamily: 'Inter',
  fontSize: 16,
  fontVariant: FontVariant.REGULAR,
};

const textSettingsFallback: TextSettings = {
  text: 'Hello',
  fontFamily: 'Inter',
  fontSize: 16,
  fontVariant: FontVariant.REGULAR,
};

/* ------------------------------------------------------------------ */
/* On first client render, try localStorage and merge                 */
/* ------------------------------------------------------------------ */
function loadInitial(): TextSettings {
  if (typeof window === 'undefined') return textSettingsFallback; // SSR

  try {
    const raw = localStorage.getItem('textSettings');
    return raw
      ? { ...textSettingsFallback, ...JSON.parse(raw) }
      : textSettingsFallback;
  } catch {
    return textSettingsFallback; // JSON parse error etc.
  }
}

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

export function TextSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, dispatch] = useReducer(
    settingsReducer,
    undefined,
    loadInitial,
  );

  useEffect(() => {
    try {
      localStorage.setItem('textSettings', JSON.stringify(settings));
    } catch {
      /* ignore quota errors */
    }
  }, [settings]);

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
    [settings],
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
