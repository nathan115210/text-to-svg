import { render, screen, waitFor } from '@testing-library/react';
import SetFontFamily from './SetFontFamily';
import { vi } from 'vitest';
import React from 'react';

// Mock fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        'Roboto',
        'Inter',
        'Open Sans',
        'Lato',
        'Montserrat',
        'Poppins',
      ]),
  }),
) as unknown as typeof fetch;

// Mock context
vi.mock('@/contexts/TextSettingsContext', () => {
  return {
    useTextSettings: () => [
      { fontFamily: 'Inter', text: '', fontSize: 16 },
      vi.fn(),
    ],
  };
});

describe('<SetFontFamily />', () => {
  it('renders skeleton initially', () => {
    render(<SetFontFamily label="Font" />);
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it('renders Select after fonts load', async () => {
    render(<SetFontFamily label="Font" />);

    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: /Inter/i }),
      ).toBeInTheDocument(),
    );

    expect(screen.getByRole('button', { name: /Inter/i })).toBeInTheDocument();
    expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
  });
});
