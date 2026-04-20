import { useScrollProgress } from '../../hooks/useScrollProgress';
import styles from './ScrollProgress.module.css';

export function ScrollProgress() {
  const p = useScrollProgress();
  return <div className={styles.bar} style={{ width: `${p}%` }} aria-hidden="true" />;
}
