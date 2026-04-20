import { useScrollReveal } from '../../hooks/useScrollReveal';
import { DATA } from '../../data';
import { Stat } from './Stat';
import styles from './About.module.css';

export function About() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} id="about" className="reveal">
      <div className="section-head">
        <div className="meta">— 01 / about</div>
        <h2>
          <span className="caret">$</span> cat about.md
        </h2>
      </div>

      <div className={styles.grid}>
        <div>
          {DATA.summary.map((p, i) => (
            <p key={i} className={`${styles.para}${i === 0 ? ` ${styles.first}` : ''}`}>
              <span className={styles.caret}>❯ </span>
              {p}
            </p>
          ))}

          <div className={styles.stats}>
            <Stat n={7} suffix="+" label="years" />
            <Stat n={5} label="companies" />
            <Stat n={12} suffix="+" label="0→1 products" />
            <Stat n="∞" staticValue label="incidents triaged" />
          </div>
        </div>

        <div className={styles.signature}>
          <div className={styles.sigLabel}>signature</div>
          <div>frontend architect · go indexer builder · design-system shipper</div>
          <hr className={styles.sigRule} />
          <div className={styles.sigLabel}>known for</div>
          <ul className={styles.sigList}>
            <li>▸ owning products 0→1</li>
            <li>▸ shipping across the stack</li>
            <li>▸ first-responder instincts</li>
            <li>▸ async, remote-first</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
