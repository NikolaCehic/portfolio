import { useActiveSection } from '../../hooks/useActiveSection';
import styles from './TopBar.module.css';

const LINKS = [
  { id: 'hero', num: '00', label: 'index' },
  { id: 'about', num: '01', label: 'about' },
  { id: 'skills', num: '02', label: 'stack' },
  { id: 'experience', num: '03', label: 'experience' },
  { id: 'projects', num: '04', label: 'projects' },
  { id: 'contact', num: '05', label: 'contact' },
] as const;

const IDS = LINKS.map((l) => l.id);

export function TopBar() {
  const active = useActiveSection(IDS);

  return (
    <div className={styles.topbar}>
      <div className={styles.inner}>
        <div>
          <span className={styles.dot} />
          <span className={styles.dim}>nikolacehic</span>
          <span className={styles.muted}>@portfolio:~$</span>
        </div>
        <nav className={styles.nav} aria-label="primary">
          {LINKS.map((l) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={isActive ? styles.active : undefined}
                aria-current={isActive ? 'location' : undefined}
              >
                <span className={styles.num}>{l.num}</span>/{l.label}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
