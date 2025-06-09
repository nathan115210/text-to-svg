import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  defaultTextSettings,
  TextSettingsProvider,
  useTextSettings,
} from '@/contexts/TextSettingsContext';
import { FontVariant } from '@/utils/types';
import userEvent from '@testing-library/user-event';

function ConsumerComponent() {
  const {
    settings,
    fontVariantSetter,
    fontSizeSetter,
    fontFamilySetter,
    textSetter,
  } = useTextSettings();
  const { text, fontSize, fontFamily, fontVariant } = settings;
  return (
    <div>
      <p data-testid="text">{text}</p>
      <p data-testid="font">{fontFamily}</p>
      <p data-testid="size">{fontSize}</p>
      <p data-testid="variant">{fontVariant}</p>
      <button onClick={() => textSetter('Hello World')}>Set Text</button>
      <button onClick={() => fontFamilySetter('Roboto')}>Set Font</button>
      <button onClick={() => fontSizeSetter(24)}>Set Size</button>
      <button onClick={() => fontVariantSetter(FontVariant.BOLD)}>
        Set Variant
      </button>
    </div>
  );
}

describe('TextSettingsContext', () => {
  it('should provide default values', () => {
    render(
      <TextSettingsProvider>
        <ConsumerComponent />
      </TextSettingsProvider>,
    );

    expect(screen.getByTestId('text').textContent).toBe(
      defaultTextSettings.text,
    );
    expect(screen.getByTestId('font').textContent).toBe(
      defaultTextSettings.fontFamily,
    );
    expect(screen.getByTestId('size').textContent).toBe(
      String(defaultTextSettings.fontSize),
    );
    expect(screen.getByTestId('variant').textContent).toBe(
      defaultTextSettings.fontVariant,
    );
  });

  it('should update state when dispatching actions', async () => {
    render(
      <TextSettingsProvider>
        <ConsumerComponent />
      </TextSettingsProvider>,
    );

    await userEvent.click(screen.getByText('Set Text'));
    await userEvent.click(screen.getByText('Set Font'));
    await userEvent.click(screen.getByText('Set Size'));
    await userEvent.click(screen.getByText('Set Variant'));

    expect(screen.getByTestId('text').textContent).toBe('Hello World');
    expect(screen.getByTestId('font').textContent).toBe('Roboto');
    expect(screen.getByTestId('size').textContent).toBe('24');
    expect(screen.getByTestId('variant').textContent).toBe(FontVariant.BOLD);
  });

  it('should throw error if used outside provider', () => {
    // Component that wrongly uses the hook without provider
    const InvalidConsumer = () => {
      useTextSettings();
      return null;
    };

    // Wrap the render in a try/catch to assert the error
    expect(() => render(<InvalidConsumer />)).toThrow(
      'useTextSettings must be used inside TextSettingsProvider',
    );
  });
});
