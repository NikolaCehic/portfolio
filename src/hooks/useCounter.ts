import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export function useCounter(target: number, suffix = '', duration = 1400) {
  const ref = useRef<HTMLElement | null>(null);
  const [value, setValue] = useState('0' + suffix);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      setValue(String(target) + suffix);
      return;
    }

    let raf = 0;
    let started = false;

    function run() {
      const start = performance.now();
      function tick(t: number) {
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        const v = target * eased;
        const rendered = target % 1 === 0 ? Math.floor(v) : v.toFixed(1);
        setValue(rendered + suffix);
        if (p < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          setValue(target + suffix);
        }
      }
      raf = requestAnimationFrame(tick);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting && !started) {
            started = true;
            run();
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target, suffix, duration, reduced]);

  return { ref, value };
}
