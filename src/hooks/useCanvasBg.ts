import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

const GLYPHS = '01▸▹◆◇▪▫⌘⎔│─├└┬┴';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  g: string;
  size: number;
  alpha: number;
  phase: number;
}

export function useCanvasBg() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (reduced) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    const NODE_COUNT = window.innerWidth < 760 ? 30 : 70;
    let nodes: Node[] = [];
    const mouse = { x: -9999, y: -9999 };
    let scrollY = 0;
    let visible = true;
    let raf = 0;

    function readColors(): { accent: string; fgDim: string } {
      const s = getComputedStyle(document.documentElement);
      return {
        accent: s.getPropertyValue('--accent').trim() || '#9aff6b',
        fgDim: s.getPropertyValue('--fg-dim').trim() || '#aaa',
      };
    }
    let colors = readColors();

    function resize() {
      if (!canvas || !ctx) return;
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    function seed() {
      nodes = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          g: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          size: 10 + Math.random() * 4,
          alpha: 0.25 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      const { accent, fgDim } = colors;
      const parallax = scrollY * 0.04;

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 140 * 140) {
            const alpha = (1 - Math.sqrt(d2) / 140) * 0.09;
            ctx.strokeStyle = `color-mix(in oklab, ${fgDim} ${alpha * 100}%, transparent)`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y - parallax);
            ctx.lineTo(b.x, b.y - parallax);
            ctx.stroke();
          }
        }
      }

      ctx.font = "11px 'JetBrains Mono', monospace";
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.phase += 0.008;
        if (n.x < -20) n.x = W + 20;
        if (n.x > W + 20) n.x = -20;
        if (n.y < -20) n.y = H + 20;
        if (n.y > H + 20) n.y = -20;

        const ny = n.y - parallax;
        const mdx = n.x - mouse.x;
        const mdy = ny - mouse.y;
        const md2 = mdx * mdx + mdy * mdy;
        let px = n.x;
        let py = ny;
        if (md2 < 140 * 140 && md2 > 0) {
          const f = 1 - Math.sqrt(md2) / 140;
          px += (mdx / Math.sqrt(md2)) * f * 18;
          py += (mdy / Math.sqrt(md2)) * f * 18;
        }

        const near = md2 < 180 * 180;
        const alpha = near ? 0.9 : n.alpha * (0.7 + 0.3 * Math.sin(n.phase));
        const color = near ? accent : fgDim;
        ctx.fillStyle = `color-mix(in oklab, ${color} ${alpha * 100}%, transparent)`;
        ctx.fillText(n.g, px, py);
      }
    }

    function loop() {
      if (visible) draw();
      raf = requestAnimationFrame(loop);
    }

    function onResize() {
      resize();
      seed();
    }
    function onMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }
    function onScroll() {
      scrollY = window.scrollY;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) visible = en.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    resize();
    seed();
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, [reduced]);

  return ref;
}
