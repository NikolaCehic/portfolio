import { useCallback, useEffect, useRef, useState } from 'react';
import { DATA } from '../../data';
import { useParallax } from '../../hooks/useParallax';
import { useMagnetic } from '../../hooks/useMagnetic';
import { useTilt } from '../../hooks/useTilt';
import { KineticText } from '../../hooks/useKineticText';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import styles from './Hero.module.css';

type SeqItem =
  | { kind: 'cmd'; text: string }
  | { kind: 'out'; lines: string[] }
  | { kind: 'chips'; chips: string[] }
  | { kind: 'blink' };

function Prompt({ user = 'guest', host = 'portfolio', path = '~' }: { user?: string; host?: string; path?: string }) {
  return (
    <span>
      <span className={styles.accent}>
        {user}@{host}
      </span>
      <span className={styles.muted}>:</span>
      <span className={styles.dim}>{path}</span>
      <span className={styles.muted}>$ </span>
    </span>
  );
}

function TypedLine({
  text,
  speed = 18,
  onDone,
}: {
  text: string;
  speed?: number;
  onDone?: () => void;
}) {
  const [out, setOut] = useState('');
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setOut(text);
      onDone?.();
      return;
    }
    let i = 0;
    let cancelled = false;
    let handle = 0;
    function tick() {
      if (cancelled) return;
      if (i <= text.length) {
        setOut(text.slice(0, i));
        i++;
        const jitter = speed + Math.random() * 20 - 4;
        handle = window.setTimeout(tick, jitter);
      } else {
        onDone?.();
      }
    }
    tick();
    return () => {
      cancelled = true;
      if (handle) window.clearTimeout(handle);
    };
  }, [text, speed, onDone, reduced]);

  return <span>{out}</span>;
}

function OutputLines({
  lines,
  isLast,
  onDone,
}: {
  lines: string[];
  isLast: boolean;
  onDone: () => void;
}) {
  const [shown, setShown] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setShown(lines.length);
      if (isLast) onDone();
      return;
    }
    if (shown < lines.length) {
      const t = window.setTimeout(() => setShown((s) => s + 1), 80);
      return () => window.clearTimeout(t);
    }
    if (isLast) {
      const t = window.setTimeout(onDone, 200);
      return () => window.clearTimeout(t);
    }
  }, [shown, isLast, lines.length, onDone, reduced]);

  return (
    <div className={styles.outWrap}>
      {lines.slice(0, shown).map((l, i) => {
        const big = i === 0 && l === l.toUpperCase() && l.length < 30;
        return big ? (
          <div key={i} className={styles.outBig}>
            <span className={styles.accent}>▸ </span>
            <KineticText text={l} />
          </div>
        ) : (
          <div key={i} className={styles.outLine}>
            {l}
          </div>
        );
      })}
    </div>
  );
}

function OutputChips({
  chips,
  isLast,
  onDone,
}: {
  chips: string[];
  isLast: boolean;
  onDone: () => void;
}) {
  const [shown, setShown] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setShown(chips.length);
      if (isLast) onDone();
      return;
    }
    if (shown < chips.length) {
      const t = window.setTimeout(() => setShown((s) => s + 1), 70);
      return () => window.clearTimeout(t);
    }
    if (isLast) {
      const t = window.setTimeout(onDone, 250);
      return () => window.clearTimeout(t);
    }
  }, [shown, isLast, chips.length, onDone, reduced]);

  return (
    <div className={styles.chips}>
      {chips.slice(0, shown).map((c, i) => (
        <span key={i} className="tag accent" style={{ fontSize: 11 }}>
          {c}
        </span>
      ))}
    </div>
  );
}

export function Hero() {
  const D = DATA;
  const [step, setStep] = useState(0);
  const advance = useCallback(() => setStep((s) => s + 1), []);

  const blob1 = useParallax<HTMLDivElement>(1.2);
  const blob2 = useParallax<HTMLDivElement>(0.6);
  const terminal = useTilt<HTMLDivElement>(3);
  const cta1 = useMagnetic<HTMLAnchorElement>(0.35);
  const cta2 = useMagnetic<HTMLAnchorElement>(0.35);
  const cta3 = useMagnetic<HTMLAnchorElement>(0.35);

  const seq = useRef<SeqItem[]>([
    { kind: 'cmd', text: 'whoami' },
    { kind: 'out', lines: [D.name.toUpperCase(), D.role] },
    { kind: 'cmd', text: 'cat ./about.md | head -3' },
    {
      kind: 'out',
      lines: [
        `# ${D.years}+ years shipping production software`,
        `# web3 · fintech · enterprise · remote-first`,
        `# belgrade, rs — available for senior / staff roles`,
      ],
    },
    { kind: 'cmd', text: 'ls ./focus' },
    {
      kind: 'chips',
      chips: [
        'cosmos-sdk-modules',
        'go-indexers',
        'block-explorers',
        'dao-frameworks',
        'design-systems',
        'frontend-architecture',
      ],
    },
    { kind: 'cmd', text: './scroll_to_continue.sh' },
    { kind: 'blink' },
  ]).current;

  return (
    <section id="hero" className={styles.section}>
      <div ref={blob1} aria-hidden="true" className={styles.blob1} />
      <div ref={blob2} aria-hidden="true" className={styles.blob2} />
      <div className={styles.wrap}>
        <div>
          <div ref={terminal} className={styles.terminal} aria-live="polite">
            <div className={styles.termHead}>
              <div className={styles.lights}>
                <span className={styles.light} />
                <span className={styles.light} />
                <span className={`${styles.light} ${styles.green}`} />
              </div>
              <span>— zsh — /home/nikola — 80×24</span>
              <span>v1.0.0</span>
            </div>
            <HeroStream seq={seq} step={step} advance={advance} />
          </div>

          <div className={styles.ctas}>
            <div className={styles.available}>
              <span className={styles.availableDot} />
              available · senior / staff
            </div>
            <span className={styles.muted}>·</span>
            <a ref={cta1} href="#experience" data-hover className={styles.cta}>
              → view experience
            </a>
            <a ref={cta2} href="#contact" data-hover className={styles.cta}>
              → get in touch
            </a>
            <a
              ref={cta3}
              href="/Nikola-Cehic-CV.pdf"
              target="_blank"
              rel="noopener"
              data-hover
              className={styles.cta}
            >
              → download cv.pdf
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStream({
  seq,
  step,
  advance,
}: {
  seq: SeqItem[];
  step: number;
  advance: () => void;
}) {
  return (
    <div>
      {seq.slice(0, step + 1).map((it, idx) => {
        const isLast = idx === step;
        if (it.kind === 'cmd') {
          return (
            <div key={idx} className={styles.cmd}>
              <Prompt />
              {isLast ? (
                <TypedLine text={it.text} speed={22} onDone={advance} />
              ) : (
                <span>{it.text}</span>
              )}
            </div>
          );
        }
        if (it.kind === 'out') {
          return <OutputLines key={idx} lines={it.lines} isLast={isLast} onDone={advance} />;
        }
        if (it.kind === 'chips') {
          return <OutputChips key={idx} chips={it.chips} isLast={isLast} onDone={advance} />;
        }
        return (
          <div key={idx} className={styles.cmd}>
            <Prompt />
            <span className={styles.blink} />
          </div>
        );
      })}
    </div>
  );
}
