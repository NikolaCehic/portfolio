// Scrolling tech marquee — pauses on hover
function TechMarquee() {
  const D = window.DATA;
  const all = [
    ...D.skills.languages, ...D.skills.frontend, ...D.skills.backend,
    ...D.skills.blockchain, ...D.skills.data, ...D.skills.tooling,
  ];
  return (
    <section aria-label="tech stack" style={{
      padding: '40px 0', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)',
      overflow: 'hidden', margin: '0 -32px',
    }}>
      <div data-marquee="30" style={{width: '100%'}}>
        <div style={{display:'flex', alignItems:'center', gap: 0, paddingRight: 0}}>
          {all.map((t, i) => (
            <span key={i} style={{
              display:'inline-flex', alignItems:'center', gap: 22,
              padding: '0 22px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 32, letterSpacing: '-0.01em',
              color: 'var(--fg-dim)', whiteSpace: 'nowrap',
            }}>
              {t}
              <span style={{color:'var(--accent)', fontSize: 18}}>◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
window.TechMarquee = TechMarquee;
