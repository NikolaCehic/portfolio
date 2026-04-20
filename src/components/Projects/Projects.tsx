import type { Project } from '../../types';
import { DATA } from '../../data';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useTilt } from '../../hooks/useTilt';
import styles from './Projects.module.css';

export function Projects() {
  const reveal = useScrollReveal<HTMLElement>();

  return (
    <section ref={reveal} id="projects" className="reveal">
      <div className="section-head">
        <div className="meta">— 04 / projects</div>
        <h2>
          <span className="caret">$</span> ls ./projects/{' '}
          <span
            style={{
              color: 'var(--fg-mute)',
              fontSize: 14,
              fontWeight: 400,
              letterSpacing: 0,
            }}
          >
            — {DATA.projects.length} shipped · side builds
          </span>
        </h2>
      </div>

      <div className={styles.list}>
        {DATA.projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} idx={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, idx }: { project: Project; idx: number }) {
  const cardRef = useTilt<HTMLElement>(3);
  const num = String(idx + 1).padStart(2, '0');

  return (
    <article ref={cardRef} className={styles.card}>
      <header className={styles.header}>
        <div className={styles.headLeft}>
          <span className={styles.dot} aria-hidden />
          <span className={styles.path}>~/projects/{project.id}</span>
        </div>
        <div className={styles.status}>
          <span className={styles.statusDot} aria-hidden />
          <span>{project.status}</span>
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <span className={styles.idx}>[{num}]</span>
          <div className={styles.titleGroup}>
            <h3 className={styles.name}>{project.name}</h3>
            <p className={styles.tagline}>{project.tagline}</p>
          </div>
        </div>

        <div className={styles.meta}>
          <span>▸ {project.year}</span>
          <span>▸ {project.role}</span>
        </div>

        <p className={styles.summary}>{project.summary}</p>

        <div className={styles.block}>
          <div className={styles.blockLabel}>$ cat ./problem.md</div>
          <p className={styles.problem}>{project.problem}</p>
        </div>

        <div className={styles.block}>
          <div className={styles.blockLabel}>stack</div>
          <div className={styles.tags}>
            {project.stack.map((s) => (
              <span key={s} className="tag accent">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.block}>
          <div className={styles.blockLabel}>
            key ships — {project.highlights.length}
          </div>
          <ol className={styles.highlights}>
            {project.highlights.map((h, i) => (
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

        <div className={styles.links}>
          {project.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer noopener"
              data-hover
              className={styles.link}
            >
              <span className={styles.linkArrow}>→</span>
              <span>{l.label}</span>
              <span className={styles.linkHost}>
                {hostnameOf(l.href)}
              </span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

function hostnameOf(href: string): string {
  try {
    return new URL(href).hostname.replace(/^www\./, '');
  } catch {
    return href;
  }
}
