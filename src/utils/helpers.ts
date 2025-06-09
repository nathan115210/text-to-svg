import type { Action } from '@/contexts/TextSettingsContext';

export const firstLetterToUpperCase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export type PayloadOf<T extends Action['type']> = Extract<
  Action,
  { type: T }
>['payload'];

/**
 * Factory: makeSettingsAction(type) returns a function that accepts
 * exactly the correct payload type for that action.
 */
export const makeSettingsAction =
  <T extends Action['type']>(type: T) =>
  (payload: PayloadOf<T>): Extract<Action, { type: T }> =>
    ({ type, payload }) as Extract<Action, { type: T }>;
