import { useEffect, useRef } from 'react';
import { useCursorTrail } from '../../hooks/useCursorTrail';
import styles from './Cursor.module.css';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useCursorTrail();

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let tx = rx;
    let ty = ry;
    let raf = 0;

    function onMove(e: MouseEvent) {
      tx = e.clientX;
      ty = e.clientY;
      if (dot) dot.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
    }
    function loop() {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      if (ring) ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    }
    function onOver(e: MouseEvent) {
      const t = e.target;
      if (!ring || !(t instanceof Element)) return;
      ring.classList.toggle(styles.hover, !!t.closest('a, button, [data-hover]'));
      ring.classList.toggle(
        styles.text,
        t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement,
      );
    }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <>
      <canvas ref={trailRef} className={styles.trail} aria-hidden="true" />
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
    </>
  );
}
