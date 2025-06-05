import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  TextSettingsProvider,
  useTextSettings,
} from '@/contexts/TextSettingsContext';
import { SetterType } from '@/utils/types';
import userEvent from '@testing-library/user-event';

function ConsumerComponent() {
  const [state, dispatch] = useTextSettings();
  return (
    <div>
      <p data-testid="text">{state.text}</p>
      <p data-testid="font">{state.fontFamily}</p>
      <p data-testid="size">{state.fontSize}</p>
      <button
        onClick={() => dispatch({ type: SetterType.SetText, payload: 'Hello' })}
      >
        Set Text
      </button>
      <button
        onClick={() =>
          dispatch({ type: SetterType.SetFontFamily, payload: 'Roboto' })
        }
      >
        Set Font
      </button>
      <button
        onClick={() => dispatch({ type: SetterType.SetFontSize, payload: 24 })}
      >
        Set Size
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

    expect(screen.getByTestId('text').textContent).toBe('');
    expect(screen.getByTestId('font').textContent).toBe('Inter');
    expect(screen.getByTestId('size').textContent).toBe('16');
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

    expect(screen.getByTestId('text').textContent).toBe('Hello');
    expect(screen.getByTestId('font').textContent).toBe('Roboto');
    expect(screen.getByTestId('size').textContent).toBe('24');
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
