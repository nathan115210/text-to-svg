import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  type MockedFunction,
} from 'vitest';

import SetFontFamily from '@/components/Settings/SetFontFamily/SetFontFamily';
import { FontVariant } from '@/types/types';
import * as TextSettingsContext from '@/contexts/TextSettingsContext';

import { useFonts } from '@/hooks/useFonts';

/* ── mock useFonts ─────────────────────────────────────────────── */
vi.mock('@/hooks/useFonts', () => ({
  useFonts: vi.fn(),
}));

/* ── mock Select component (simple button) ─────────────────────── */
vi.mock('@/components/Select/Select', () => ({
  default: ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (v: string) => void;
  }) => (
    <button data-testid="select" onClick={() => onChange('Roboto')}>
      {value}
    </button>
  ),
}));

/* ── helpers & spies ───────────────────────────────────────────── */
const fontFamilySetter = vi.fn();

function stubContext(fontFamily = 'Inter') {
  vi.spyOn(TextSettingsContext, 'useTextSettings').mockReturnValue({
    settings: {
      text: '',
      fontFamily,
      fontSize: 16,
      fontVariant: FontVariant.REGULAR,
    },
    fontFamilySetter,
    // stubs for unused setters
    textSetter: () => {},
    fontSizeSetter: () => {},
    fontVariantSetter: () => {},
  } as never);
}

const mockedUseFonts = useFonts as MockedFunction<typeof useFonts>;

describe('SetFontFamily', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    fontFamilySetter.mockReset();
  });

  it('shows Skeleton while fonts are loading', () => {
    mockedUseFonts.mockReturnValue(null);
    stubContext();

    render(<SetFontFamily label="Font Family" />);

    // Skeleton component renders; select does not
    expect(screen.queryByTestId('select')).not.toBeInTheDocument();
  });

  it('renders Select when fonts are loaded', () => {
    mockedUseFonts.mockReturnValue(['Inter', 'Roboto']);
    stubContext();

    render(<SetFontFamily label="Font Family" />);

    expect(screen.getByTestId('select')).toBeInTheDocument();
    expect(screen.getByTestId('select')).toHaveTextContent('Inter');
  });

  it('updates context and UI on font select', () => {
    mockedUseFonts.mockReturnValue(['Inter', 'Roboto']);
    stubContext();

    render(<SetFontFamily label="Font Family" />);

    // Initial font is Inter
    expect(screen.getByTestId('select')).toHaveTextContent('Inter');

    // Click mock Select → fires onChange('Roboto')
    fireEvent.click(screen.getByTestId('select'));

    // Context setter called
    expect(fontFamilySetter).toHaveBeenCalledWith('Roboto');

    // Component re-renders with new value
    expect(screen.getByTestId('select')).toHaveTextContent('Roboto');
  });
});
