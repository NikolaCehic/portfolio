import { useState } from 'react';
import { DATA } from '../../data';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Skills.module.css';

export function Skills() {
  const entries = Object.entries(DATA.skills);
  const [hover, setHover] = useState<string | null>(null);
  const ref = useScrollReveal<HTMLElement>();
  const cols = 2;
  const lastRowStart = Math.floor((entries.length - 1) / cols) * cols;

  return (
    <section ref={ref} id="skills" className="reveal">
      <div className="section-head">
        <div className="meta">— 02 / stack</div>
        <h2>
          <span className="caret">$</span> tree ./stack
        </h2>
      </div>

      <div className={styles.grid}>
        {entries.map(([cat, items], i) => {
          const isRightCol = i % cols === cols - 1;
          const isLastRow = i >= lastRowStart;
          const cls = [
            styles.cell,
            isRightCol ? styles.rightCol : '',
            isLastRow ? styles.lastRow : '',
            hover === cat ? styles.hover : '',
          ]
            .filter(Boolean)
            .join(' ');
          const treeCls = `${styles.tree}${hover === cat ? ` ${styles.treeActive}` : ''}`;
          return (
            <div
              key={cat}
              className={cls}
              onMouseEnter={() => setHover(cat)}
              onMouseLeave={() => setHover(null)}
            >
              <div className={styles.cellHead}>
                <div className={styles.cellTitle}>
                  <span className={treeCls}>├──</span> {cat}
                </div>
                <div className={styles.cellCount}>{items.length}</div>
              </div>
              <div className={styles.tags}>
                {items.map((s) => (
                  <span key={s} className="tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.footnote}>
        <span className={styles.footnoteAccent}>└──</span> also comfortable with: CI/CD pipelines,
        observability, schema design, wallet / signer integrations, live-incident triage.
      </div>
    </section>
  );
}
