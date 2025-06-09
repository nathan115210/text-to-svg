import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('useFonts hook', () => {
  const fontList = ['Inter', 'Roboto', 'Open Sans', 'Lato'];

  // We’ll reset the module between tests to clear the module-level cache
  const loadHook = async (limit = 100) => {
    const { useFonts } = await import('./useFonts');
    return renderHook(() => useFonts(limit));
  };

  beforeEach(() => {
    vi.resetModules();
    vi.restoreAllMocks();
  });

  it('fetches fonts once then caches', async () => {
    const fetchMock = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => fontList,
    } as Response);

    // First mount -> triggers fetch
    const { result } = await loadHook();
    expect(result.current).toBeNull(); // initial state

    await waitFor(() => {
      expect(result.current).toEqual(fontList.slice(0, 100));
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    // Second mount -> should reuse cache, no additional fetch
    const { result: second } = await loadHook();
    expect(second.current).toEqual(fontList.slice(0, 100));
    expect(fetchMock).toHaveBeenCalledTimes(1); // still one call
  });

  it('respects the limit arg', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => fontList,
    } as Response);

    const { result } = await loadHook(2);
    await waitFor(() => {
      expect(result.current).toEqual(['Inter', 'Roboto']); // only 2 items
    });
  });
});
