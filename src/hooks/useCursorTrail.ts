import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface Dot {
  x: number;
  y: number;
  life: number; // 0..1
}

const MAX_DOTS = 18;
const DECAY = 1 / 35;

export function useCursorTrail() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || reduced) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const dots: Dot[] = [];
    let raf = 0;
    let accent = '';

    function readAccent() {
      accent =
        getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() ||
        '#9aff6b';
    }
    function resize() {
      if (!canvas || !ctx) return;
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    function onMove(e: MouseEvent) {
      dots.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (dots.length > MAX_DOTS) dots.shift();
    }
    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const d of dots) {
        d.life -= DECAY;
      }
      while (dots.length && dots[0].life <= 0) dots.shift();
      for (const d of dots) {
        const size = 4 + (1 - d.life) * 10;
        ctx.fillStyle = `color-mix(in oklab, ${accent} ${d.life * 70}%, transparent)`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    readAccent();
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, [reduced]);

  return ref;
}
