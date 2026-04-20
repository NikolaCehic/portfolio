import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

describe('usePrefersReducedMotion', () => {
  it('returns false when media query does not match', () => {
    vi.stubGlobal(
      'matchMedia',
      (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }),
    );
    window.matchMedia = vi.mocked(window.matchMedia);
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);
  });
});
