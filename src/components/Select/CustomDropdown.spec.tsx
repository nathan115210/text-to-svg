import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomDropdown from '@/components/Select/CustomDropdown';
import { vi } from 'vitest';

describe('CustomDropdown Component', () => {
  const options = ['Inter', 'Roboto', 'Open Sans'];
  const placeholder = 'Select a font';
  const groupLabel = 'Fonts';

  it('renders the placeholder when no value is selected', () => {
    render(
      <CustomDropdown
        id="font-select"
        options={options}
        value=""
        onChange={vi.fn()}
        defaultValue={placeholder}
        groupLabel={groupLabel}
      />,
    );
    expect(screen.getByText(placeholder)).toBeInTheDocument();
  });

  it('renders the selected value', () => {
    render(
      <CustomDropdown
        id="font-select"
        options={options}
        value="Roboto"
        onChange={vi.fn()}
        defaultValue={placeholder}
        groupLabel={groupLabel}
      />,
    );
    expect(screen.getByText('Roboto')).toBeInTheDocument();
  });

  it('toggles dropdown on trigger click', () => {
    render(
      <CustomDropdown
        id="font-select"
        options={options}
        value=""
        onChange={vi.fn()}
        defaultValue={placeholder}
        groupLabel={groupLabel}
      />,
    );
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    expect(screen.getByText(groupLabel)).toBeInTheDocument();
  });

  it('calls onChange and closes menu on option click', async () => {
    const handleChange = vi.fn();
    render(
      <CustomDropdown
        id="font-select"
        value=""
        onChange={handleChange}
        defaultValue="Select font"
        options={['Roboto', 'Inter']}
        groupLabel="Fonts"
      />,
    );

    fireEvent.click(screen.getByRole('button')); // open dropdown
    fireEvent.click(screen.getByText('Roboto')); // click option

    expect(handleChange).toHaveBeenCalledWith('Roboto');
    expect(screen.queryByText('Fonts')).not.toBeInTheDocument();
  });
});
