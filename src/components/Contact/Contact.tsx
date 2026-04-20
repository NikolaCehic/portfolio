import { useCallback, useState } from 'react';
import { DATA } from '../../data';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { copyToClipboard } from '../../utils/copyToClipboard';
import styles from './Contact.module.css';

function linkedinDisplay(url: string): string {
  try {
    const u = new URL(url);
    return u.host.replace(/^www\./, '') + u.pathname.replace(/\/$/, '');
  } catch {
    return url;
  }
}

export function Contact() {
  const ref = useScrollReveal<HTMLElement>();
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    const ok = await copyToClipboard(DATA.email);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }, []);

  return (
    <section ref={ref} id="contact" className="reveal" style={{ paddingBottom: 60 }}>
      <div className="section-head">
        <div className="meta">— 05 / contact</div>
        <h2>
          <span className="caret">$</span> ./get_in_touch.sh
        </h2>
      </div>

      <div className={styles.grid}>
        <div>
          <p className={styles.lead}>
            open to senior / staff roles{' '}
            <span className={styles.leadAccent}>—</span> especially web3 infra, design systems, and
            0→1 frontend.
          </p>
          <p className={styles.note}>
            Best way to reach me is email. I reply within 24h on weekdays. I work async across EU /
            US hours and ship fast.
          </p>
        </div>

        <div className={styles.table}>
          <ContactRow
            label="email"
            value={DATA.email}
            href={`mailto:${DATA.email}`}
            copyable
            onCopy={onCopy}
            copied={copied}
          />
          <ContactRow label="phone" value={DATA.phone} href={`tel:${DATA.phone.replace(/\s/g, '')}`} />
          <ContactRow
            label="linkedin"
            value={linkedinDisplay(DATA.linkedinUrl)}
            href={DATA.linkedinUrl}
            external
          />
          <ContactRow label="location" value={`${DATA.location}  ·  UTC+1`} />
          <ContactRow
            label="resume"
            value="Nikola-Cehic-CV.pdf"
            href="/Nikola-Cehic-CV.pdf"
            download
            external
          />
        </div>
      </div>
    </section>
  );
}

interface ContactRowProps {
  label: string;
  value: string;
  href?: string;
  copyable?: boolean;
  onCopy?: () => void;
  copied?: boolean;
  external?: boolean;
  download?: boolean;
}

function ContactRow({
  label,
  value,
  href,
  copyable,
  onCopy,
  copied,
  external,
  download,
}: ContactRowProps) {
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      {href ? (
        <a
          href={href}
          data-hover
          className={styles.value}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener' : undefined}
          download={download ? '' : undefined}
        >
          {value}
        </a>
      ) : (
        <span className={styles.valueDim}>{value}</span>
      )}
      <span className={styles.actions}>
        {copyable && (
          <button
            data-hover
            onClick={onCopy}
            className={`${styles.copy}${copied ? ` ${styles.copied}` : ''}`}
            disabled={copied}
            aria-live="polite"
          >
            {copied ? 'copied' : 'copy'}
          </button>
        )}
        {external && <span className={styles.ext}>↗</span>}
      </span>
    </div>
  );
}
