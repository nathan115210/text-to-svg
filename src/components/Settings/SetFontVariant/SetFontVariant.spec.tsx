import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SetFontVariant from './SetFontVariant';
import { describe, vi, it, expect } from 'vitest';
import * as TextSettingsContext from '@/contexts/TextSettingsContext';
import {
  defaultTextSettings,
  TextSettingsCtxProps,
} from '@/contexts/TextSettingsContext';
import { FakeProvider } from '@/utils/unitTest';
import { firstLetterToUpperCase } from '@/utils/helpers';

describe('SetFontVariant', () => {
  const mockSetter = vi.fn();
  const mockContextValue: TextSettingsCtxProps = {
    settings: defaultTextSettings,
    textSetter: vi.fn(),
    fontFamilySetter: vi.fn(),
    fontSizeSetter: vi.fn(),
    fontVariantSetter: mockSetter,
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(TextSettingsContext, 'useTextSettings').mockReturnValue(
      mockContextValue,
    );
  });

  it('renders with default variant', () => {
    render(<SetFontVariant label="Font Variant" />);
    const select = screen.getByTestId('font-variant-select');
    expect(select).toHaveTextContent(
      firstLetterToUpperCase(defaultTextSettings.fontVariant),
    );
  });

  it('calls setter on variant change', () => {
    render(<SetFontVariant label="Font Variant" />);
    const trigger = screen.getByTestId('font-variant-select');

    fireEvent.click(trigger); // open dropdown

    const boldOption = screen.getByRole('button', { name: 'Bold' });
    fireEvent.click(boldOption); // select Bold

    expect(mockSetter).toHaveBeenCalledWith('Bold');
  });

  it('updates visible text after selection', () => {
    render(
      <FakeProvider>
        <SetFontVariant label="Font Variant" />
      </FakeProvider>,
    );

    const trigger = screen.getByTestId('font-variant-select');
    expect(trigger).toHaveTextContent('Regular');

    fireEvent.click(trigger);
    const boldOption = screen.getByRole('button', { name: 'Bold' });
    fireEvent.click(boldOption);

    expect(trigger).toHaveTextContent('Bold');
  });

  it('updates context value after variant change', async () => {
    render(
      <FakeProvider>
        <SetFontVariant label="Font Variant" />
      </FakeProvider>,
    );
    const select = screen.getByTestId('font-variant-select');

    // Initially, the value is 'Regular'
    expect(select).toHaveTextContent('Regular');

    // Change the variant
    fireEvent.change(select, { target: { value: 'Bold' } });

    // Re-render should reflect the updated state.
    // Use findByTestId to wait for the update.
    const updatedSelect = await screen.findByTestId('font-variant-select');
    expect((updatedSelect as HTMLSelectElement).value).toBe('Bold');
  });
});
