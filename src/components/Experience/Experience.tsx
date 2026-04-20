import { useState } from 'react';
import type { Experience as ExperienceType } from '../../types';
import { DATA } from '../../data';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useTilt } from '../../hooks/useTilt';
import styles from './Experience.module.css';

export function Experience() {
  const reveal = useScrollReveal<HTMLElement>();
  const [hovered, setHovered] = useState<number | null>(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const previewRef = useTilt<HTMLElement>(4);

  const expandedIndex = expandedId
    ? DATA.experience.findIndex((j) => j.id === expandedId)
    : -1;
  const currentIndex =
    expandedIndex >= 0 ? expandedIndex : hovered ?? 0;
  const current = DATA.experience[currentIndex];

  return (
    <section ref={reveal} id="experience" className="reveal">
      <div className="section-head">
        <div className="meta">— 03 / experience</div>
        <h2>
          <span className="caret">$</span> experience.log{' '}
          <span
            style={{
              color: 'var(--fg-mute)',
              fontSize: 14,
              fontWeight: 400,
              letterSpacing: 0,
            }}
          >
            — {DATA.experience.length} roles · 7+ yrs
          </span>
        </h2>
      </div>

      <div className={styles.grid}>
        <div onMouseLeave={() => setHovered(null)}>
          {DATA.experience.map((job, i) => (
            <XPRow
              key={job.id}
              job={job}
              idx={i}
              total={DATA.experience.length}
              isHovered={hovered === i}
              anyHovered={hovered !== null}
              expanded={expandedId === job.id}
              onHover={() => setHovered(i)}
              onToggle={() =>
                setExpandedId((prev) => (prev === job.id ? null : job.id))
              }
            />
          ))}
        </div>

        <aside ref={previewRef} className={styles.preview}>
          <PreviewCard job={current} />
        </aside>
      </div>
    </section>
  );
}

interface XPRowProps {
  job: ExperienceType;
  idx: number;
  total: number;
  isHovered: boolean;
  anyHovered: boolean;
  expanded: boolean;
  onHover: () => void;
  onToggle: () => void;
}

function XPRow({
  job,
  idx,
  total,
  isHovered,
  anyHovered,
  expanded,
  onHover,
  onToggle,
}: XPRowProps) {
  const dim = anyHovered && !isHovered && !expanded;
  const cls = [
    styles.row,
    idx === total - 1 ? styles.lastRow : '',
    isHovered ? styles.hover : '',
    dim ? styles.dim : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cls} onMouseEnter={onHover}>
      <button
        type="button"
        onClick={onToggle}
        data-hover
        className={styles.button}
        aria-expanded={expanded}
        aria-controls={`xp-${job.id}`}
      >
        <span className={styles.idx}>[{String(idx + 1).padStart(2, '0')}]</span>
        <span className={styles.meta}>
          <span className={styles.company}>
            {job.company}
            <span className={styles.companyRole}>— {job.role}</span>
          </span>
          <span className={styles.sub}>
            <span>{job.period}</span>
            <span>·</span>
            <span>{job.mode}</span>
            <span>·</span>
            <span>{job.stack.slice(0, 4).join(' / ')}</span>
          </span>
        </span>
        <span className={`${styles.chev}${expanded ? ` ${styles.expanded}` : ''}`}>→</span>
      </button>

      {expanded && (
        <div id={`xp-${job.id}`} className={styles.expand}>
          <div className={styles.expandSummary}>{job.summary}</div>
          <div className={styles.tags}>
            {job.stack.map((s) => (
              <span key={s} className="tag">
                {s}
              </span>
            ))}
          </div>
          <ol className={styles.highlights}>
            {job.highlights.map((h, i) => (
              <li key={h.title} className={styles.highlight}>
                <span className={styles.highlightIdx}>
                  {String(i + 1).padStart(2, '0')}.
                </span>
                <span className={styles.highlightTitle}>{h.title}</span>
                <span className={styles.highlightBody}>{h.body}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

function PreviewCard({ job }: { job: ExperienceType }) {
  return (
    <div key={job.id} className={styles.previewCard}>
      <div className={styles.previewLabel}>$ cat ./experience/{job.id}.md</div>
      <div className={styles.previewCompany}>{job.company}</div>
      <div className={styles.previewRole}>{job.role}</div>
      <div className={styles.previewMeta}>
        <span>▸ {job.period}</span>
        <span>▸ {job.mode}</span>
      </div>
      <div className={styles.previewSummary}>{job.summary}</div>
      <div className={styles.previewSection}>stack</div>
      <div className={styles.previewStack}>
        {job.stack.map((s) => (
          <span key={s} className="tag accent">
            {s}
          </span>
        ))}
      </div>
      <div className={styles.previewSection}>key ships — {job.highlights.length}</div>
      <ul className={styles.previewShips}>
        {job.highlights.slice(0, 4).map((h) => (
          <li key={h.title} className={styles.previewShipItem}>
            <span className={styles.accent}>▸</span>
            <span>{h.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
