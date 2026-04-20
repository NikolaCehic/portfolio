import { useEffect, useMemo, useRef } from 'react';
import type { CSSProperties } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface KineticTextProps {
  text: string;
  radius?: number;
  strength?: number;
  style?: CSSProperties;
}

export function KineticText({ text, radius = 120, strength = 0.2, style }: KineticTextProps) {
  const reduced = usePrefersReducedMotion();
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const chars = useMemo(() => Array.from(text), [text]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || reduced) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>('[data-kchar]'));

    let raf = 0;
    let lastX = 0;
    let lastY = 0;

    function apply() {
      for (const s of spans) {
        const r = s.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = lastX - cx;
        const dy = lastY - cy;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < radius) {
          const f = 1 - d / radius;
          s.style.transform = `translate(${-dx * f * strength}px, ${-dy * f * strength}px)`;
          s.style.color = 'var(--accent)';
        } else {
          s.style.transform = '';
          s.style.color = '';
        }
      }
      raf = 0;
    }
    function onMove(e: MouseEvent) {
      lastX = e.clientX;
      lastY = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(apply);
    }
    function onLeave() {
      for (const s of spans) {
        s.style.transform = '';
        s.style.color = '';
      }
    }
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [radius, strength, reduced, chars.length]);

  return (
    <span ref={containerRef} style={style}>
      {chars.map((ch, i) => (
        <span
          key={i}
          data-kchar=""
          style={{
            display: 'inline-block',
            transition: 'transform 0.3s cubic-bezier(.2,.7,.2,1), color 0.2s',
          }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  );
}
