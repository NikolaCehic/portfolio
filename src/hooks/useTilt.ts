import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export function useTilt<T extends HTMLElement = HTMLElement>(max = 8) {
  const ref = useRef<T | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    el.style.transition = 'transform 0.18s cubic-bezier(.2,.7,.2,1)';
    el.style.transformStyle = 'preserve-3d';

    let raf = 0;
    let lastX = 0;
    let lastY = 0;

    function apply() {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (lastX - r.left) / r.width - 0.5;
      const y = (lastY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * max}deg) rotateX(${-y * max}deg) translateZ(0)`;
      el.style.setProperty('--glare-x', `${x * 100 + 50}%`);
      el.style.setProperty('--glare-y', `${y * 100 + 50}%`);
      raf = 0;
    }
    function onMove(e: MouseEvent) {
      lastX = e.clientX;
      lastY = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(apply);
    }
    function onLeave() {
      if (el) el.style.transform = '';
    }
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      el.style.transform = '';
    };
  }, [max, reduced]);

  return ref;
}
