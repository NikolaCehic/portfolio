import styles from './Footer.module.css';

function buildStamp(): string {
  return new Date().toISOString().slice(0, 16).replace('T', ' ') + 'Z';
}

export function Footer() {
  return (
    <div className="page">
      <footer className={styles.footer}>
        <div className={styles.col}>
          <b>nikola ćehić</b>
          senior fullstack engineer · belgrade, rs · remote-first
          <br />
          7+ yrs · web3 · fintech · enterprise
        </div>
        <div className={`${styles.col} ${styles.right}`}>
          <b>© {new Date().getFullYear()}</b>
          built with vite + react + ts · no trackers
          <br />
          last deploy: <span>{buildStamp()}</span>
        </div>
      </footer>
    </div>
  );
}
