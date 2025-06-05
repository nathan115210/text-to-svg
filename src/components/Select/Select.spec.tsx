import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Select from './Select';

vi.mock('@/components/Select/CustomDropdown', () => ({
  default: ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (v: string) => void;
  }) => (
    <div data-testid="custom-dropdown">
      <p>{`MockDropdown: ${value}`}</p>
      <button onClick={() => onChange('Option 2')}>Change to Option 2</button>
    </div>
  ),
}));

describe('Select Component', () => {
  it('renders the label and CustomDropdown', () => {
    render(
      <Select
        id="font-select"
        label="Font"
        value="Option 1"
        onChange={() => {}}
        options={['Option 1', 'Option 2']}
        placeholder="Choose a font"
        dropdownGroupLabel="Fonts"
      />,
    );

    expect(screen.getByText('Font')).toBeInTheDocument();
    expect(screen.getByTestId('custom-dropdown')).toBeInTheDocument();
    expect(screen.getByText(/MockDropdown: Option 1/)).toBeInTheDocument();
  });

  it('triggers onChange when CustomDropdown triggers change', () => {
    const handleChange = vi.fn();

    render(
      <Select
        id="font-select"
        label="Font"
        value="Option 1"
        onChange={handleChange}
        options={['Option 1', 'Option 2']}
        placeholder="Choose a font"
        dropdownGroupLabel="Fonts"
      />,
    );

    fireEvent.click(screen.getByText('Change to Option 2'));
    expect(handleChange).toHaveBeenCalledWith('Option 2');
  });
});
