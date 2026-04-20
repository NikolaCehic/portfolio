import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export function useParallax<T extends HTMLElement = HTMLElement>(amount: number) {
  const ref = useRef<T | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    let raf = 0;
    function apply() {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const delta = center - window.innerHeight / 2;
      el.style.transform = `translateY(${delta * amount * -0.15}px)`;
      raf = 0;
    }
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(apply);
    }
    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (el) el.style.transform = '';
    };
  }, [amount, reduced]);

  return ref;
}
