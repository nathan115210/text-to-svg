// tests/useDownload.spec.tsx
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { useDownload } from '@/hooks/useDownload';
import * as helpers from '@/utils/helpers';

describe('useDownload', () => {
  beforeEach(() => {
    // Replace triggerDownload with a spy
    vi.spyOn(helpers, 'triggerDownload').mockImplementation(() => {});
    // Use fake timers so we can advance the 1500 ms
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('initially isDownloaded is false', () => {
    const { result } = renderHook(() => useDownload());
    expect(result.current.isDownloaded).toBe(false);
  });

  it('calls triggerDownload and sets isDownloaded true', async () => {
    const svg = '<svg/>';
    const { result } = renderHook(() => useDownload(1500));

    // fire download action
    await act(async () => {
      await result.current.download(svg);
    });

    // download called
    expect(helpers.triggerDownload).toHaveBeenCalledTimes(1);
    const [blobArg, filenameArg] = helpers.triggerDownload.mock.calls[0];
    expect(blobArg).toBeInstanceOf(Blob);
    expect(filenameArg).toBe('text-to-svg.svg');

    // state updated
    expect(result.current.isDownloaded).toBe(true);
  });

  it('resets isDownloaded after feedbackMs timeout', async () => {
    const svg = '<svg/>';
    const feedback = 5000;
    const { result } = renderHook(() => useDownload(feedback));

    // trigger download
    await act(async () => {
      await result.current.download(svg);
    });
    expect(result.current.isDownloaded).toBe(true);

    // advance by less than feedbackMs
    act(() => {
      vi.advanceTimersByTime(feedback - 100);
    });
    expect(result.current.isDownloaded).toBe(true);

    // advance over feedbackMs
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current.isDownloaded).toBe(false);
  });

  it('catches and logs when triggerDownload throws', async () => {
    // make triggerDownload throw
    (helpers.triggerDownload as vi.SpyInstance).mockImplementation(() => {
      throw new Error('fail');
    });
    const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const svg = '<svg/>';
    const { result } = renderHook(() => useDownload(1500));

    // call download
    await act(async () => {
      await result.current.download(svg);
    });

    // should have warned
    expect(consoleWarn).toHaveBeenCalledWith(
      'Download failed',
      expect.any(Error),
    );

    // state should stay false
    expect(result.current.isDownloaded).toBe(false);

    consoleWarn.mockRestore();
  });
});
