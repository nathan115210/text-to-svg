'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
  type Dispatch,
} from 'react';
import { SetterType } from '@/utils/types';

/** ------------------------------
 * Types
 --------------------------------- */
export type TextSettings = {
  text: string;
  fontFamily: string;
  fontSize: number;
};

type Action =
  | { type: SetterType.SetText; payload: string }
  | { type: SetterType.SetFontFamily; payload: string }
  | { type: SetterType.SetFontSize; payload: number };

type TextSettingsContextType = [TextSettings, Dispatch<Action>];

/** ------------------------------
 * Constants
 --------------------------------- */
const defaultTextSettings: TextSettings = {
  text: '',
  fontFamily: 'Inter',
  fontSize: 16,
};

/** ------------------------------
 * Reducer
 --------------------------------- */
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

/** ------------------------------
 * Context
 --------------------------------- */
const TextSettingsCtx = createContext<TextSettingsContextType | undefined>(
  undefined,
);

/** ------------------------------
 * Provider
 --------------------------------- */
export function TextSettingsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(settingsReducer, defaultTextSettings);

  return (
    <TextSettingsCtx.Provider value={[state, dispatch]}>
      {children}
    </TextSettingsCtx.Provider>
  );
}

/** ------------------------------
 * Hook
 --------------------------------- */
export function useTextSettings(): TextSettingsContextType {
  const ctx = useContext(TextSettingsCtx);
  if (!ctx) {
    throw new Error('useTextSettings must be used inside TextSettingsProvider');
  }
  return ctx;
}
