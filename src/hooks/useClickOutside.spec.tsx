import React, { useRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useClickOutside } from './useClickOutside';

/* ───────── Helper component that wires the hook ───────── */
function TestComponent({
  onOutside,
}: {
  onOutside: (e: MouseEvent | TouchEvent) => void;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  useClickOutside(boxRef, onOutside);

  return (
    <>
      <div
        data-testid="inside"
        ref={boxRef}
        style={{ width: 100, height: 100 }}
      >
        inside
      </div>
      <div data-testid="outside">outside</div>
    </>
  );
}

/* ───────── Tests ───────── */
describe('useClickOutside', () => {
  it('calls handler when clicking outside the element', () => {
    const handler = vi.fn();
    const { getByTestId } = render(<TestComponent onOutside={handler} />);

    // Click outside
    fireEvent.mouseDown(getByTestId('outside'));

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('does not call handler when clicking inside the element', () => {
    const handler = vi.fn();
    const { getByTestId } = render(<TestComponent onOutside={handler} />);

    // Click inside
    fireEvent.mouseDown(getByTestId('inside'));

    expect(handler).not.toHaveBeenCalled();
  });
});
