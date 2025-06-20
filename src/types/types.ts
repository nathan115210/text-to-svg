export enum SetterType {
  SetText = 'set-text',
  SetFontVariant = 'set-font-variant',
  SetFontFamily = 'set-font-family',
  SetFontSize = 'set-fontSize',
}

export enum FontVariant {
  REGULAR = 'regular',
  BOLD = 'bold',
  LIGHT = 'light',
}

/** ------ settings shape ------ */
export type TextSettings = {
  text: string;
  fontFamily: string;
  fontSize: number;
  fontVariant: FontVariant;
};
/** ------ Action union ------ */
export type Action =
  | { type: SetterType.SetText; payload: string }
  | { type: SetterType.SetFontFamily; payload: string }
  | { type: SetterType.SetFontSize; payload: number }
  | { type: SetterType.SetFontVariant; payload: FontVariant };
