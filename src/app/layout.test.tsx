import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

// ----- Mock next/font/google ---------------------------------------------
vi.mock('next/font/google', () => ({
  Geist: () => ({ variable: '--font-geist-sans' }),
  Geist_Mono: () => ({ variable: '--font-geist-mono' }),
}));

// Component under test
import RootLayout from '@/app/layout';

describe('RootLayout', () => {
  it('renders html/body with font classes and children', () => {
    render(
      <RootLayout>
        <div data-testid="child">Hello</div>
      </RootLayout>,
    );

    // html lang
    expect(document.documentElement.lang).toBe('en');

    // body classes
    const body = document.body;
    expect(body.classList.contains('--font-geist-sans')).toBe(true);
    expect(body.classList.contains('--font-geist-mono')).toBe(true);
    expect(body.classList.contains('antialiased')).toBe(true);

    // children rendered
    expect(screen.getByTestId('child').textContent).toBe('Hello');
  });
});
