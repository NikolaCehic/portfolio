import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#________';

export function useScramble(finalText: string, duration = 900) {
  const ref = useRef<HTMLElement | null>(null);
  const [text, setText] = useState(finalText);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) {
      setText(finalText);
      return;
    }

    let raf = 0;
    let started = false;

    function run() {
      const start = performance.now();
      function frame(t: number) {
        const p = Math.min(1, (t - start) / duration);
        let out = '';
        for (let i = 0; i < finalText.length; i++) {
          const reveal = p > i / finalText.length;
          out += reveal
            ? finalText[i]
            : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
        setText(out);
        if (p < 1) {
          raf = requestAnimationFrame(frame);
        } else {
          setText(finalText);
        }
      }
      raf = requestAnimationFrame(frame);
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
      { threshold: 0.6 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [finalText, duration, reduced]);

  return { ref, text };
}
