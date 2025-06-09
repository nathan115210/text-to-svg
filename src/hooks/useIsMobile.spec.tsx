import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('useIsMobile', () => {
  // Lazy-import so we get a fresh module per test
  const loadHook = async () => {
    const { useIsMobile } = await import('./useIsMobile');
    return useIsMobile;
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns true when width <= breakpoint, false otherwise', async () => {
    // Set initial width
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 600,
    });

    const useIsMobile = await loadHook();
    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);

    // Change width above breakpoint
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        value: 1024,
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(false);
  });

  it('uses custom breakpoint param', async () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 900,
    });

    const useIsMobile = await loadHook();
    const { result } = renderHook(() => useIsMobile(1000));

    expect(result.current).toBe(true); // 900 <= 1000

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        value: 1100,
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(false);
  });
});
