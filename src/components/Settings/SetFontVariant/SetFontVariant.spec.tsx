import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SetFontVariant from './SetFontVariant';
import { describe, vi, it, expect, beforeEach } from 'vitest';
import * as TextSettingsContext from '@/contexts/TextSettingsContext';
import { FontVariant, SetterType } from '@/utils/types';
import { SelectProps } from '@/components/Select/Select';
import type { TextSettingsContextType } from '@/contexts/TextSettingsContext';

// Mock Select component (optional - depends on your implementation)
vi.mock('@/components/Select/Select', () => ({
  default: ({ id, label, value, onChange, options }: SelectProps) => (
    <div>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid="font-variant-select"
      >
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  ),
}));

describe('SetFontVariant', () => {
  const mockSetter = vi.fn();
  const mockContextValue: TextSettingsContextType = [
    {
      fontFamily: 'Inter',
      text: '',
      fontSize: 16,
      fontVariant: FontVariant.REGULAR,
    },
    mockSetter,
  ];

  beforeEach(() => {
    vi.spyOn(TextSettingsContext, 'useTextSettings').mockReturnValue(
      mockContextValue,
    );
  });

  it('renders with default variant', () => {
    render(<SetFontVariant label="Font Variant" />);
    const select = screen.getByTestId(
      'font-variant-select',
    ) as HTMLSelectElement;
    expect(select.value).toBe('Regular');
  });

  it('calls setter on variant change', () => {
    render(<SetFontVariant label="Font Variant" />);
    const select = screen.getByTestId(
      'font-variant-select',
    ) as HTMLSelectElement;

    fireEvent.change(select, { target: { value: 'Bold' } });
    expect(mockSetter).toHaveBeenCalledWith({
      type: SetterType.SetFontVariant,
      payload: 'Bold',
    });
  });
});
