import { useEffect, useState } from 'react';
import styles from './BootOverlay.module.css';

const DOTS = ['.', '..', '...'];

export function BootOverlay() {
  const [dots, setDots] = useState('...');
  const [gone, setGone] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i = (i + 1) % DOTS.length;
      setDots(DOTS[i]);
    }, 180);
    const hide = setTimeout(() => {
      setGone(true);
      const clear = setTimeout(() => setRemoved(true), 500);
      return () => clearTimeout(clear);
    }, 350);
    return () => {
      clearInterval(t);
      clearTimeout(hide);
    };
  }, []);

  if (removed) return null;

  return (
    <div className={`${styles.overlay}${gone ? ` ${styles.gone}` : ''}`} aria-hidden={gone}>
      initializing&nbsp;<span>{dots}</span>
    </div>
  );
}
