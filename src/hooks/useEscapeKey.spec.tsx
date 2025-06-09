import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useEscapeKey } from './useEscapeKey';

function TestComponent({ onEsc }: { onEsc: (e: KeyboardEvent) => void }) {
  useEscapeKey(onEsc);
  return <div>Press ESC</div>;
}

/* ───────── Tests ───────── */
describe('useEscapeKey', () => {
  it('calls handler when Escape is pressed', () => {
    const handler = vi.fn();
    render(<TestComponent onEsc={handler} />);

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('does not call handler for other keys', () => {
    const handler = vi.fn();
    render(<TestComponent onEsc={handler} />);

    fireEvent.keyDown(document, { key: 'Enter', code: 'Enter' });
    expect(handler).not.toHaveBeenCalled();
  });
});
