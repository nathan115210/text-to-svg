'use client';

import React, { createContext, useContext, useReducer } from 'react';
import { SetterType } from '@/utils/types';

export type TextSettings = {
  text: string;
  fontFamily: string;
  fontSize: number;
};

type Action =
  | { type: SetterType.SetText; payload: string }
  | { type: SetterType.SetFontFamily; payload: string }
  | { type: SetterType.SetFontSize; payload: number };

function settingsReducer(state: TextSettings, action: Action): TextSettings {
  switch (action.type) {
    case SetterType.SetText:
      return { ...state, text: action.payload };
    case SetterType.SetFontFamily:
      return { ...state, fontFamily: action.payload };
    case SetterType.SetFontSize:
      return { ...state, fontSize: action.payload };
    default:
      return state;
  }
}

const TextSettingsCtx = createContext<
  [TextSettings, React.Dispatch<Action>] | undefined
>(undefined);

const defaultTextSettings: TextSettings = {
  text: '',
  fontFamily: 'Inter',
  fontSize: 16,
};

export function TextSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(settingsReducer, defaultTextSettings);

  console.log('data', state);

  return (
    <TextSettingsCtx.Provider value={[state, dispatch]}>
      {children}
    </TextSettingsCtx.Provider>
  );
}

/* Convenience hook */
export function useTextSettings() {
  const ctx = useContext(TextSettingsCtx);
  if (!ctx)
    throw new Error('useTextSettings must be used inside TextSettingsProvider');
  return ctx; // [state, dispatch]
}
