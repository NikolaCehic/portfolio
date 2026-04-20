import { useCounter } from '../../hooks/useCounter';
import styles from './About.module.css';

interface StatProps {
  n: number | string;
  label: string;
  suffix?: string;
  staticValue?: boolean;
}

export function Stat({ n, label, suffix = '', staticValue = false }: StatProps) {
  const target = typeof n === 'number' ? n : Number(n);
  const animate = !staticValue && Number.isFinite(target);
  const { ref, value } = useCounter(animate ? target : 0, suffix);

  return (
    <div className={styles.stat}>
      <div className={styles.statNum}>
        {animate ? (
          <span ref={ref as React.RefObject<HTMLSpanElement>}>{value}</span>
        ) : (
          <span>{n}</span>
        )}
      </div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}
